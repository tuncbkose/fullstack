interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps) => {
  if (message === ''){
    return null
  }

  const errorStyle = {
    color: 'red',
    marginBottom: 10
  }

  return (
    <div style={errorStyle} className='notification'>
      {message}
    </div>
  )
}

export default Notification