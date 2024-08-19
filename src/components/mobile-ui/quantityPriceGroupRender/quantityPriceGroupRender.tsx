import { Render } from '../../../AxzoEzForm/core/componentFactory'
import { CellGroup } from 'vant'

const quantityPriceGroupRender: Render = (_, ctx) => {
  const defaultSlots = ctx.slots;
  return (
    <CellGroup title='量价信息'>
      {defaultSlots}
    </CellGroup>
  )
}
export { quantityPriceGroupRender }
