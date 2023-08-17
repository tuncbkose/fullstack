interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps) => {
  if (message === ''){
    return null
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={errorStyle} className='notification'>
      {message}
    </div>
  )
}

export default Notification