interface SpaceProps {
    value: number
}
export function Space(props: SpaceProps) {
    return <div style={{height: props.value}}/>
}