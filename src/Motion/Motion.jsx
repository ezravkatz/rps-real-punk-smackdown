const Component = React.forwardRef((props, ref) => (
  <div ref={ref} />
))

const MotionComponent = motion(Component)