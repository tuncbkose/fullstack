const Notification = ({ settings }) => {
  if (settings.message === ''){
    return null
  }

  const errorStyle = {
    color: settings.color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={errorStyle} className='notification'>
      {settings.message}
    </div>
  )
}

export default Notification