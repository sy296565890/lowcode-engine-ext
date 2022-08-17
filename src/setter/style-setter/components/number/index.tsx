import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Button, Dropdown, Icon, Menu, NumberPicker } from '@alifd/next';
import { StyleData, onStyleChange } from '../../utils/types';
import { getUnit, addUnit, removeUnit, isEmptyValue, getPlaceholderPropertyValue } from '../../utils';
import './index.less';
interface numberProps {
  styleKey: string;
  styleData: StyleData | any;
  onStyleChange?: onStyleChange;
  units?: Array<string>;
  unit?: string;
  min?: number;
  max?: number;
  style?: any;
  className?: string;
  field?: any;
  placeholderScale?: number;
  useComputedStyle?: boolean;
}

export default (props: numberProps) => {
  const {
    styleData,
    styleKey,
    units = ['px', '%', 'auto', 'rem', 'em'],
    unit,
    onStyleChange,
    min,
    max,
    style = {},
    className = '',
    placeholderScale,
  } = props;

  // if (styleKey === 'width'){
  //   console.log('.........A..........',getUnit(styleData[styleKey]), styleData[styleKey], styleKey)
  //   console.log('.........A..........',style, style[styleKey], getUnit(styleData[styleKey]) || getUnit(style[styleKey]) || 'px')
  //   // alert(getUnit(styleData[styleKey]) || getUnit(style[styleKey]) || 'px')
  // }

  const [placeholder, setPlaceholder] = useState<any>(null);
  const [val, setVal] = useState<any>(removeUnit(styleData[styleKey]) || 1);
  const [_unit, _setUnit] = useState<string | undefined | null>(getUnit(styleData[styleKey]) || getUnit(style[styleKey]) || 'px');

  const setUnit = (unit: string | undefined | null) => {
    if(unit==='auto') setPlaceholder('auto')
    else setPlaceholder('请输入')
    _setUnit(unit)
    // onNumberChange(styleKey, val, unit)
    onStyleChange([
      {
        styleKey,
        value: unit === 'auto' ? undefined : addUnit(val || 1, unit)
      },
    ]);
  }
  const onNumberChange = (styleKey: string, value: number, t_unit?: string) => {
    const __unit = t_unit === 'auto' ? units?.length > 0 ? units[0] : unit ? unit : 'px' : t_unit
    if (_unit === 'auto') _setUnit(__unit)
    setVal(value)
    onStyleChange([
      {
        styleKey,
        // value: unit ? addUnit(value, unit) : value,
        value: __unit ? addUnit(value, __unit) : value,
      },
    ]);
  };

  const initData = (props: numberProps) => {
    const { field, styleKey, useComputedStyle } = props;
    if (useComputedStyle) {
      const placeholder = getPlaceholderPropertyValue(field, styleKey);

      if (placeholder && !isNaN(placeholder)) {
        setPlaceholder(placeholder * (1 / placeholderScale));
      } else {
        setPlaceholder('auto');
      }
    }
  };

  useEffect(() => {
    initData(props);
  }, []);

  useEffect(()=>{
    setVal(removeUnit(styleData[styleKey]) || 1)
    _setUnit(getUnit(styleData[styleKey]) || getUnit(style[styleKey]) || _unit || 'px')
  },[styleData])

  return (<NumberPicker
    style={style}
    className={`${className} fix-button`}
    value={unit ? removeUnit(styleData[styleKey]) : styleData[styleKey]}
    min={isEmptyValue(min) ? Number.MIN_SAFE_INTEGER : min}
    max={isEmptyValue(max) ? Number.MAX_SAFE_INTEGER : max}
    onChange={(val) => onNumberChange(styleKey, val, _unit === 'auto' ? 'px' : _unit)}
    alwaysShowTrigger
    precision={6}
    upBtnProps={{
      style: { width: '12px'},
      iconSize: 5,
      // icons: { loading: <Icon type="loading" size='xxs' style={{ color: "orange" }} /> },
      component: 'div',
    }}
    downBtnProps={{
      style: { width: '12px'},
      iconSize: 5,
      // icons: { loading: <Icon type="arrow-down" size='xxs' /> },
      component: 'div',
    }}
    // onChange={(v,e)=>console.log(v,e)}
    // innerAfter={unit ? unit : ''}
    innerAfter={units?.length > 0 ? <Dropdown
      trigger={<Button type="normal" text
      style={{
        // border: 'solid 1px red',
        marginRight: _unit === 'rem' ? '5px' : ''
      }}
      >{_unit === 'auto' ? '-' : _unit}</Button>} triggerType="click"
    >
      <Menu>
        {
          units?.map(item=><Menu.Item onClick={() => { setUnit(item) }}>{item}</Menu.Item>)
        }
        {/* <Menu.Item onClick={() => { setUnit('px') }}>px</Menu.Item>
        <Menu.Item onClick={() => { setUnit('%') }}>%</Menu.Item>
        <Menu.Item onClick={() => { setUnit('') }}>auto</Menu.Item> */}
      </Menu>
    </Dropdown> : units?.length === 1 ? units[0] : unit ? unit : ''}
    placeholder={placeholder}
  ></NumberPicker>);
};
