import type { CollectionAfterChangeHook } from 'payload'

/**
 * Emails the address configured on the Contact global whenever a new form
 * submission is created. Runs after create only — updates (including the
 * status write-back below) are skipped via the `skipEmailHook` context flag
 * to avoid re-triggering itself.
 */
export const sendFormSubmissionEmail: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
  context,
}) => {
  if (operation !== 'create' || context?.skipEmailHook) return doc

  const { payload } = req

  let contact: unknown
  try {
    contact = await payload.findGlobal({ slug: 'contact', req })
  } catch (error) {
    payload.logger.error(
      `form-submissions: findGlobal step failed — ${error instanceof Error ? error.message : String(error)}`,
    )
    return doc
  }

  const to = (contact as { notificationEmail?: string })?.notificationEmail

  if (!to) {
    payload.logger.warn(
      'form-submissions: no notification email configured on the Contact global — skipping send.',
    )
    return doc
  }

  const lines = [
    `Name: ${doc.name}`,
    `Email: ${doc.email}`,
    doc.phone ? `Phone: ${doc.phone}` : null,
    doc.business ? `Business: ${doc.business}` : null,
    doc.service ? `Service interest: ${doc.service}` : null,
    `Source: ${doc.formSource}`,
    '',
    'Message:',
    doc.message,
  ]
    .filter((line) => line !== null)
    .join('\n')

  let emailStatus: 'sent' | 'failed' = 'sent'
  try {
    await payload.sendEmail({
      to,
      replyTo: doc.email,
      subject: `New contact form submission from ${doc.name}`,
      text: lines,
    })
  } catch (error) {
    emailStatus = 'failed'
    payload.logger.error(
      `form-submissions: sendEmail step failed — ${error instanceof Error ? error.message : String(error)}`,
    )
  }

  try {
    await payload.update({
      collection: 'form-submissions',
      id: doc.id,
      data: { emailStatus },
      context: { skipEmailHook: true },
      depth: 0,
      req,
    })
  } catch (error) {
    payload.logger.error(
      `form-submissions: status write-back step failed — ${error instanceof Error ? error.message : String(error)}`,
    )
  }

  return doc
}

export default sendFormSubmissionEmail
