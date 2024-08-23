import { Form } from 'vant'
import 'vant/lib/index.css'
import { Render } from '../../AxzoEzForm/core/types'

const quantityPriceFormRender:Render<any> = (_, ctx) => {
  const defaultSlot = ctx.slots
  return (
        <Form>
          {defaultSlot}
        </Form>
  )
}
export { quantityPriceFormRender }
