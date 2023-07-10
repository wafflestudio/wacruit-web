export type spacerProps = {
  margin?: string;
};

export const spacer = (props: spacerProps) => ({
  margin: props.margin || 0,
});
