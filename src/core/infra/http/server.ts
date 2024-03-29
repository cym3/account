// import { disableBillsJob } from '@bill/infra/jobs/disable-bills'
// import { failUnpaidInvoiceJob } from '@bill/infra/jobs/fail-unpaid-invoice'
import app from '@core/infra/http/app'
import { port } from '@utils/env'

const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' })
    await app.ready()
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
