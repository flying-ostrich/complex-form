import { FunctionalComponent } from 'vue'
import { EzFormGroup } from '../../../AxzoEzForm/core'
import { quantityPriceGroupRender } from '../../ui'

const GroupQuantityPrice:FunctionalComponent = (_,ctx)=>{
  const slots = ctx.slots;
  return (
    <EzFormGroup logicHandler={()=>ctx} render={quantityPriceGroupRender} >
      {slots}
    </EzFormGroup>
  )
}

export default GroupQuantityPrice;
