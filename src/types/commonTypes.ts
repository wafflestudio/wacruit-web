// Union type
type ValueType = string | number | boolean;
export type Union<T extends ReadonlyArray<ValueType>> = T[number];
/* 사용예시 */
// const modalStates = ["open", "closed", "closing"] as const;
// export type ModalState = Union<typeof modalStates>;
// 결과: ("open" | "closed" | "closing") type
