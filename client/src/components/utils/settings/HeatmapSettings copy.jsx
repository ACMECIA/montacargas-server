import React, { Fragment, useEffect, useState } from "react";

import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Image } from "antd";
import layoutImage from "../../images/layout3.png";

export default function HeatmapConfig({
  chartName = "Heatmap config",
  serverType,
  dataPath,
}) {
  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },

    name: "uploaded_file",
    action: `api/${serverType}/${dataPath}`,
    maxCount: 1,
  };

  return (
    <Fragment>
      <strong className="text-gray-700 font-medium">{chartName}</strong>
      <div className="overflow:hidden w-full h-full p-4">
        <Image width={200} src={layoutImage} />
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>
            Subir imagen en formato .png
          </Button>
        </Upload>
      </div>
    </Fragment>
  );
}
// client / src / components / utils / settings / HeatmapSettings.jsx;
