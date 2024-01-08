import { chart } from "highcharts";
import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import GeneralButton from "../GeneralButton";
import { Checkbox, ConfigProvider } from "antd";
import "../../../index.css";

// const users = [
//   {
//     id: "1",
//     email: "delpiero.flores@acmecia.com",
//   },
//   {
//     id: "2",
//     email: "kelly.zavala@kmmp.com.pe",
//   },
//   {
//     id: "3",
//     email: "cesar.yohan@kmmp.com.pe",
//   },
// ];

// Hacer un fetch a la base de datos para obtener los usuarios

export default function UserManagement({ chartName, serverType, dataPath }) {
  const [isFetching, setIsFetching] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  const [users, setUsers] = useState([]);

  const fetchData = () => {
    if (!isFetching) {
      setIsFetching(true);
      fetch(`api/${serverType}/${dataPath}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUsers(data);
          setIsFetching(false);

          // setPosts(data);
        })
        .catch((err) => {
          console.log(err.message);
          setIsFetching(false);
        });
    }
  };

  useEffect(() => {
    // Ejecutar fetchData inicialmente
    fetchData();
  }, []);

  const onAdd = () => {
    setAddUser(true);
    setDeleteUser(false);
  };

  const onDel = () => {
    setAddUser(false);
    setDeleteUser(true);
  };

  const onCancel = () => {
    setAddUser(false);
    setDeleteUser(false);
  };
  const onSumbit = () => {
    setAddUser(false);
    setDeleteUser(false);
    //SOmething else that updates the database
  };

  return (
    <Fragment>
      <strong className="text-gray-700 font-medium">{chartName}</strong>
      <div className="overflow:hidden w-full h-full p-4">
        {addUser ? (
          <AddUser />
        ) : deleteUser ? (
          <DeleteUser users={users} onCancel={onCancel} onSubmit={onSumbit} />
        ) : (
          <UsersTable users={users} onAdd={onAdd} onDel={onDel} />
        )}
      </div>
    </Fragment>
  );
}

function UsersTable({ users, onAdd, onDel }) {
  return (
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

      <div className="flex flex-row justify-center py-2 space-x-2">
        <GeneralButton onClickFunction={onDel}>Eliminar </GeneralButton>
        <GeneralButton onClickFunction={onAdd}>Añadir </GeneralButton>
      </div>
    </div>
  );
}

function AddUser() {
  return <Fragment></Fragment>;
}

function DeleteUser({ users, onCancel, onSubmit }) {
  return (
    <div className="mt-3">
      <table className="w-full text-grey-700 border-x border-gray-200 rounded-sm">
        <thead>
          <tr>
            <td>Emails</td>
            <td>Seleccionar</td>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => (
            <tr key={row.id}>
              <td>{row.email}</td>
              <td>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#e74c4c",
                    },
                  }}
                >
                  <Checkbox />
                </ConfigProvider>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-row justify-center py-2 space-x-2">
        <GeneralButton
          color="komatsu-blue-light"
          // width={"50%"}
          onClickFunction={onCancel}
        >
          Cancelar
        </GeneralButton>
        <GeneralButton onClickFunction={onSubmit}>Actualizar </GeneralButton>
      </div>
    </div>
  );
}
