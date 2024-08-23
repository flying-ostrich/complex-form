import { CellGroup } from 'vant'
import { Render } from '../../../AxzoEzForm/core/types';

const quantityPriceGroupRender: Render<any> = (_, ctx) => {
  const defaultSlots = ctx.slots;
  return (
    <CellGroup title='量价信息'>
      {defaultSlots}
    </CellGroup>
  )
}
export { quantityPriceGroupRender }
