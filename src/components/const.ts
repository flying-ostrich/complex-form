/** 计价方式枚举 */
export enum PRICE_TYPE {
    PIECE_COUNT = 3, // 计件
    PIECE_TIME = 1, // 计时
    AMOUNT_SUM = 2, // 金额包干
    DAY_SUM = 4, // 工日包干
}

export const PRICE_METHOD_OPTION = [
  { label: '计日', val: PRICE_TYPE.PIECE_TIME, disabled: false },
  { label: '计件', val: PRICE_TYPE.PIECE_COUNT, disabled: false },
  { label: '包干', val: [PRICE_TYPE.AMOUNT_SUM, PRICE_TYPE.DAY_SUM], disabled: false }
]
