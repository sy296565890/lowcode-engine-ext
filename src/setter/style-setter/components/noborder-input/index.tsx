import { Input, NumberPicker } from "@alifd/next";


const NoBorderInput = (props: any) => {

  return <div style={{ zIndex: 10000 }}>
    <Input
      className="next-noborder"
      placeholder="0"
      maxLength={3}
      // value={removeUnit(styleData['marginRight'])}
      // onChange={(val) => onInputChange('marginRight', val)}
      // onKeyDown={(e) => onInputKeyDown(e.key, 'marginRight')}
    ></Input>
    {/* <NumberPicker
      // size="small"
      precision={2}
      style={{ border: 'solid 1px red', height: 20, lineHeight: 20 }} /> */}
    {JSON.stringify(props)}
  </div>
}

export default NoBorderInput;