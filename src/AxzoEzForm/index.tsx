import { EzFormFactory } from './core';
import { EzFormFactoryCfg } from './core/types';
export * from './core/componentFactory';

const useEzFormFactory = <FormModel,>(factoryCfg: EzFormFactoryCfg<FormModel>) => {
    return {
        EzForm: EzFormFactory<FormModel>(factoryCfg),
    }
}


export { useEzFormFactory }


