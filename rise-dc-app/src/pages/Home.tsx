export default function Home() {
  return (
    <div>
      <h1 className='text-3xl'>RISE DC</h1>
      <p>Welcome to RISE DC</p>

      <button onClick={() => console.log(listEvents())}>List Events</button>
      <button onClick={() => createEvent({"name": "test event name"})}>Create Event</button>
    </div>
  )
}
