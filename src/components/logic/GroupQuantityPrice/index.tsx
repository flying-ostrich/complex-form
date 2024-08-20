import { FunctionalComponent } from 'vue'
import { useEzForm } from '../../../AxzoEzForm/core'
import { quantityPriceGroupRender } from '../../ui'
import { QuantityPriceFormModel } from '../../types';

const GroupQuantityPrice: FunctionalComponent = (_, ctx) => {
  const { EzFormGroup } = useEzForm<QuantityPriceFormModel>();
  const slots = ctx.slots;

  return (
    <EzFormGroup  logicHandler={() => ctx} render={quantityPriceGroupRender} >
      {slots}
    </EzFormGroup>
  )
}

export default GroupQuantityPrice;
