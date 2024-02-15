import React, { Fragment, useEffect, useState } from "react";

import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Image, InputNumber } from "antd";
import { Form, Space } from "antd";
import SubmitButton from "../../charts/components/SubmitButton";

export default function HeatmapConfig({
  chartName = "Heatmap config",
  serverType,
  dataPath,
}) {
  const fetchEdit = ({ filters }) => {
    fetch(`api/settings/heatmap`, {
      method: "POST",
      body: JSON.stringify({ filters }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.payload);

        // setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [imageSrc, setImageSrc] = useState("/files/uploads/layout.png");

  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} no es un archivo png`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      // console.log(info.fileList);
      if (info.fileList[0].status === "done") {
        setImageSrc(`/files/uploads/layout.png?t=${Date.now()}`);
        console.log(`Uploaded successfully`);
      }
    },

    name: "uploaded_file",
    action: `api/${serverType}/${dataPath}`,
    maxCount: 1,
  };

  return (
    <Fragment>
      <strong className="text-gray-700 font-medium">{chartName}</strong>
      <div className="overflow:hidden w-full h-full flex flex-col p-4 space-y-4 justify-center items-center mt-5">
        <Image width={250} src={imageSrc} />

        <Upload {...props}>
          <Button icon={<UploadOutlined />}>
            Subir imagen en formato .png
          </Button>
        </Upload>
      </div>
      <CoordinatesLimits fetchEdit={fetchEdit} />
    </Fragment>
  );
}

export function CoordinatesLimits({ fetchEdit }) {
  return (
    <Fragment>
      <div className="overflow:hidden w-full h-full p-4">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex flex-row gap-4">
              <FormFilter formName="LatLongFilter" fetchData={fetchEdit} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export function FormFilter({ width = "60%", formName, fetchData }) {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const config = {
    rules: [
      {
        type: "string",
        required: true,
        message: "Seleccione un estado",
      },
    ],
  };
  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Seleccione un rango",
      },
    ],
  };
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    console.log("here");
    console.log(fieldsValue);
    const values = {
      ...fieldsValue,
      latitudeRange: fieldsValue["latitude-range"],
      longitudeRange: fieldsValue["longitude-range"],
    };

    fetchData({ filters: values });
    console.log("Received values of form: ", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name={formName}
      {...formItemLayout}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ width: "100%" }}
    >
      <Form.Item name="latitude-range" label="Latitud (x)" {...rangeConfig}>
        <NumberRange
          label1={"latitud mínima"}
          label2={"latitud máxima"}
          units={"Ton."}
          width={width}
        />
      </Form.Item>

      <Form.Item name="longitude-range" label="Longitud (y)" {...rangeConfig}>
        <NumberRange
          label1={"longitud mínima"}
          label2={"longitud máxima"}
          units={"Ton."}
          width={width}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        }}
      >
        <SubmitButton width={width}> Actualizar </SubmitButton>
      </Form.Item>
    </Form>
  );
}

export function NumberRange({ label1, label2, units, width, value, onChange }) {
  const on1Change = (val) => {
    const current = value ? [...value] : [];
    current[0] = val === null ? 0 : val;
    onChange(current);
  };

  const on2Change = (val) => {
    const current = value ? [...value] : [];
    current[1] = val === null ? 0 : val;
    onChange(current);
  };

  // const onSubmit = () => {
  //   if (value[0] > value[1]) {
  //     alert("El valor inicial no puede ser mayor al valor final");
  //     return;
  //   }

  // };

  return (
    <Space.Compact block style={{ width: width }}>
      <InputNumber
        placeholder={label1}
        style={{ width: "100%" }}
        // defaultValue={1000}
        // formatter={(value) =>
        //   `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        // }
        // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        onChange={on1Change}
        value={value ? value[0] : null}
      />
      <InputNumber
        // addonAfter={units}
        placeholder={label2}
        style={{ width: "100%" }}
        // defaultValue={100}
        // min={0}
        // max={100}
        // formatter={(value) => `${value} Ton.`}
        // parser={(value) => value.replace("Ton.", "")}
        onChange={on2Change}
        value={value ? value[1] : null}
      />
    </Space.Compact>
  );
}
