function BookingStatusSelect({ booking, onChange }) {
  return (
    <select value={booking.status} onChange={(event) => onChange(booking.id, event.target.value)}>
      <option value="PENDING">PENDING</option>
      <option value="APPROVED">APPROVED</option>
      <option value="REJECTED">REJECTED</option>
      <option value="CHECKED_IN">CHECKED_IN</option>
      <option value="CHECKED_OUT">CHECKED_OUT</option>
    </select>
  );
}

export default BookingStatusSelect;
