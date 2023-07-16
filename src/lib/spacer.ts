export type SpacerProps = {
  margin?: string;
};

export const spacer = (props: SpacerProps) => ({
  margin: props?.margin,
});
