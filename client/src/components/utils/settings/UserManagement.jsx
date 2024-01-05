import { chart } from "highcharts";
import React, { Fragment } from "react";

const users = [
  {
    id: "1",
    email: "delpiero.flores@acmecia.com",
  },
  {
    id: "2",
    email: "kelly.zavala@kmmp.com.pe",
  },
  {
    id: "3",
    email: "cesar.yohan@kmmp.com.pe",
  },
];

export default function UserManagement({ chartName }) {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">{chartName}</strong>
      <div className="mt-3">
        <table className="w-full text-grey-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr>
              <td>Emails</td>
            </tr>
          </thead>
          <tbody>
            {users.map((row) => (
              <tr key={row.id}>
                <td>{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
