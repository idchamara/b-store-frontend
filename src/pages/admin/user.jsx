export default function AdminUsersPage(){
    return(
        <div className="w-full h-full rounded-lg overflow-auto">
            <div className="w-full h-full rounded-lg bg-amber-200">
                <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Email Address</th>
                        <th className="p-2">First Name</th>
                        <th className="p-2">Last Name</th>
                        <th className="p-2">Phone Number</th>
                        <th className="p-2">Role</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            </div>
        </div>
    )
}