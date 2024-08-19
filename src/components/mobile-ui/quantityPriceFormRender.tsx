import { Render } from '../../AxzoEzForm/core/componentFactory'
import { Form } from 'vant'
import 'vant/lib/index.css'

const quantityPriceFormRender:Render = (_, ctx) => {
  const defaultSlot = ctx.slots
  return (
        <Form>
          {defaultSlot}
        </Form>
  )
}
export { quantityPriceFormRender }
