// Minimal replacement for react-flexbox-grid (which imports global CSS from
// node_modules — forbidden in Next 14). Maps the same Row/Col/Grid props to
// flexboxgrid2 class names from styles/flexboxgrid.css (imported in _app.js).
import React from 'react'

const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl']

function colClasses(props) {
  const classes = []
  if (props.className) classes.push(props.className)
  for (const bp of BREAKPOINTS) {
    const v = props[bp]
    if (v === true) classes.push(`col-${bp}`)
    else if (Number.isInteger(v)) classes.push(`col-${bp}-${v}`)
    const off = props[`${bp}Offset`]
    if (Number.isInteger(off)) classes.push(`col-${bp}-offset-${off}`)
  }
  if (props.first) classes.push(`first-${props.first}`)
  if (props.last) classes.push(`last-${props.last}`)
  return classes.join(' ')
}

function stripGridProps(props) {
  const out = { ...props }
  for (const bp of BREAKPOINTS) {
    delete out[bp]
    delete out[`${bp}Offset`]
  }
  delete out.first
  delete out.last
  delete out.className
  delete out.tagName
  return out
}

export function Grid({ fluid, className, tagName, children, ...rest }) {
  const Tag = tagName || 'div'
  const cls = [fluid ? 'container-fluid' : 'container', className]
    .filter(Boolean)
    .join(' ')
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  )
}

const ROW_MODIFIERS = [
  'reverse',
  'start',
  'center',
  'end',
  'top',
  'middle',
  'bottom',
  'around',
  'between',
]

export function Row(props) {
  const { tagName, className, children, ...rest } = props
  const Tag = tagName || 'div'
  const classes = ['row']
  if (className) classes.push(className)
  for (const mod of ROW_MODIFIERS) {
    const v = props[mod]
    if (!v) continue
    // boolean → bare modifier ("reverse"); string viewport → "start-xs"
    classes.push(v === true ? mod : `${mod}-${v}`)
  }
  const clean = { ...rest }
  for (const mod of ROW_MODIFIERS) delete clean[mod]
  return (
    <Tag className={classes.join(' ')} {...clean}>
      {children}
    </Tag>
  )
}

export function Col(props) {
  const { tagName, children, ...rest } = props
  const Tag = tagName || 'div'
  return (
    <Tag className={colClasses(props)} {...stripGridProps(rest)}>
      {children}
    </Tag>
  )
}
