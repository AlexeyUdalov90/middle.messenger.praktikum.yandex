type Test = {
  a: string,
  b: number
}

function index(props: Test): string {
  const a: number = props.b

  return `${props.a} ${a}`
}

index({ a: 'test', b: 5 })

export default index
