export default function Profile() {
  return (
    <div className="card">
        <h2 className="title">Profile</h2>
        <form className="grid sm-2">
            <div>
                <label>Full Name</label>
                <input type="text" placeholder="e.g. Aanya Gupta" />
            </div>
            <div>
                <label>Grade</label>
                <select>
                <option>Grade 6</option>
                <option>Grade 7</option>
                <option>Grade 8</option>
                </select>
            </div>
            <button className="btn primary">Save Profile</button>
        </form>
    </div>
  );
}
