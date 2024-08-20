import { EzFormFactory } from './EzForm';
import { EzFormGroupFactory } from './EzFormGroup';
import { EzFormItemFactory } from './EzFormItem';

export * from './componentFactory';
export { EzFormFactory } from './EzForm';
export { EzFormGroupFactory } from './EzFormGroup';
export { EzFormItemFactory } from './EzFormItem';

const useEzForm = <FormModel,>() => {
    return {
        EzForm: EzFormFactory<FormModel>(),
        EzFormItem: EzFormItemFactory<FormModel>(),
        EzFormGroup: EzFormGroupFactory<FormModel>()
    }
}

export { useEzForm }


