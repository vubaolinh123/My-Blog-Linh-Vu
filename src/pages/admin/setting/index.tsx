/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, Button, Tooltip } from "antd";
import axios from "axios";
import { env } from "process";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Icon from "../../../components/Icons";
import LayoutAdmin from "../../../components/Layout/admin";
import { path } from "../../../constants/path";
import useColor from "../../../hooks/useColor";
import useSetting from "../../../hooks/useSetting";
import stylesAdmin from "../../../styles/Admin.module.css";
import styles from "./Color.module.css";

type Props = {};

const WebsiteColor = (props: Props) => {
  const CLOUDINARY_API: any = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const UPLOAD_PRESETS: any = process.env.NEXT_PUBLIC_UPLOAD_PRESETS;

  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>();
  const [previewSource, setPreviewSource] = useState<any>();
  const [sizeLogoHeader, setSizeLogoHeader] = useState("");
  const [sizeLogoFooter, setSizeLogoFooter] = useState("");
  const { getAllColor, detail, edit, error } = useColor();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //set gia tri
  useEffect(() => {
    const getDataSetting = async () => {
      const [dataSetting]: any = await getAllColor();
      setPreviewSource(dataSetting.url);
      reset(dataSetting);
      setSizeLogoHeader(dataSetting?.sizeLogoHeader);
      if (document.querySelector<HTMLElement>(`#bgTop`) !== null) {
        document.querySelector<HTMLElement>(`#bgTop`)!.style.backgroundColor =
          dataSetting?.bgTop;
      }
      if (document.querySelector<HTMLElement>(`#textTop`) !== null) {
        document.querySelector<HTMLElement>(`#textTop`)!.style.color =
          dataSetting?.textTop;
      }
      if (document.querySelector<HTMLElement>(`#bgHeader`) !== null) {
        document.querySelector<HTMLElement>(
          `#bgHeader`
        )!.style.backgroundColor = dataSetting?.bgHeader;
      }
      if (document.querySelector<HTMLElement>(`#bgHeader2`) !== null) {
        document.querySelector<HTMLElement>(
          `#bgHeader2`
        )!.style.backgroundColor = dataSetting?.bgHeader;
      }
      if (document.querySelector<HTMLElement>(`#textLogo`) !== null) {
        document.querySelector<HTMLElement>(`#textLogo`)!.style.color =
          dataSetting?.textLogo;
      }
      if (document.querySelector<HTMLElement>(`#textMenu`) !== null) {
        document.querySelector<HTMLElement>(`#textMenu`)!.style.color =
          dataSetting?.textMenu;
      }
      if (document.querySelector<HTMLElement>(`#iconSun`) !== null) {
        document.querySelector<HTMLElement>(`#iconSun`)!.style.color =
          dataSetting?.iconSun;
      }
      if (document.querySelector<HTMLElement>(`#iconFolder`) !== null) {
        document.querySelector<HTMLElement>(`#iconFolder`)!.style.color =
          dataSetting?.iconFolder;
      }
      if (document.querySelector<HTMLElement>(`#iconGear`) !== null) {
        document.querySelector<HTMLElement>(`#iconGear`)!.style.color =
          dataSetting?.iconGear;
      }
      if (document.querySelector<HTMLElement>(`#iconImage`) !== null) {
        document.querySelector<HTMLElement>(`#iconImage`)!.style.color =
          dataSetting?.iconImage;
      }
      if (document.querySelector<HTMLElement>(`#iconPen`) !== null) {
        document.querySelector<HTMLElement>(`#iconPen`)!.style.color =
          dataSetting?.iconPen;
      }
      if (document.querySelector<HTMLElement>(`#textMenuHover`) !== null) {
        document.querySelector<HTMLElement>(`#textMenuHover`)!.style.color =
          dataSetting?.textMenuHover;
      }
      if (document.querySelector<HTMLElement>(`#bgFooter`) !== null) {
        document.querySelector<HTMLElement>(
          `#bgFooter`
        )!.style.backgroundColor = dataSetting?.bgFooter;
      }
      if (document.querySelector<HTMLElement>(`#textFooter`) !== null) {
        document.querySelector<HTMLElement>(`#textFooter`)!.style.color =
          dataSetting?.textFooter;
      }
      if (document.querySelector<HTMLElement>(`#textLinkFooter`) !== null) {
        document.querySelector<HTMLElement>(`#textLinkFooter`)!.style.color =
          dataSetting?.textLinkFooter;
      }
      if (document.querySelector<HTMLElement>(`#bgFooterBottom`) !== null) {
        document.querySelector<HTMLElement>(
          `#bgFooterBottom`
        )!.style.backgroundColor = dataSetting?.bgFooterBottom;
      }
      if (document.querySelector<HTMLElement>(`#textFooterBottom`) !== null) {
        document.querySelector<HTMLElement>(`#textFooterBottom`)!.style.color =
          dataSetting?.textFooterBottom;
      }
      if (document.querySelector<HTMLElement>(`#bgMain`) !== null) {
        document.querySelector<HTMLElement>(`#bgMain`)!.style.backgroundColor =
          dataSetting?.bgMain;
      }
      if (document.querySelector<HTMLElement>(`#textMain`) !== null) {
        document.querySelector<HTMLElement>(`#textMain`)!.style.color =
          dataSetting?.textMain;
      }
      if (document.querySelector<HTMLElement>(`#textMainLink`) !== null) {
        document.querySelector<HTMLElement>(`#textMainLink`)!.style.color =
          dataSetting?.textMainLink;
      }
      if (document.querySelector<HTMLElement>(`#bgMainContent`) !== null) {
        document.querySelector<HTMLElement>(
          `#bgMainContent`
        )!.style.backgroundColor = dataSetting?.bgMainContent;
      }
      if (document.querySelector<HTMLElement>(`#bgMainContent2`) !== null) {
        document.querySelector<HTMLElement>(
          `#bgMainContent2`
        )!.style.backgroundColor = dataSetting?.bgMainContent;
      }
      if (document.querySelector<HTMLElement>(`#bgBtn`) !== null) {
        document.querySelector<HTMLElement>(`#bgBtn`)!.style.backgroundColor =
          dataSetting?.bgBtn;
      }
      if (document.querySelector<HTMLElement>(`#bgBtnHover`) !== null) {
        document.querySelector<HTMLElement>(
          `#bgBtnHover`
        )!.style.backgroundColor = dataSetting?.bgBtnHover;
      }
      if (document.querySelector<HTMLElement>(`#asideLink`) !== null) {
        document.querySelector<HTMLElement>(`#asideLink`)!.style.color =
          dataSetting?.asideLink;
      }
    };

    getDataSetting();
  }, []);

  const handleChangeImage = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setImage(e.target.value);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onHandleChangeColorBg = (key: string, event: any) => {
    if (document.querySelector<HTMLElement>(`#${key}`)) {
      if (key === "bgMainContent") {
        document.querySelector<HTMLElement>(`#${key}`)!.style.backgroundColor =
          event.target.value;
        document.querySelector<HTMLElement>(`#${key}2`)!.style.backgroundColor =
          event.target.value;
        return;
      }
      document.querySelector<HTMLElement>(`#${key}`)!.style.backgroundColor =
        event.target.value;
    }
  };
  const onHandleChangeColor = (key: string, event: any) => {
    if (document.querySelector<HTMLElement>(`#${key}`)) {
      if (key === "textMain") {
        document.querySelector<HTMLElement>(`#${key}`)!.style.color =
          event.target.value;
        document.querySelector<HTMLElement>(`#${key}2`)!.style.color =
          event.target.value;
      }
      document.querySelector<HTMLElement>(`#${key}`)!.style.color =
        event.target.value;
    }
  };
  const onHandleChangeSizeLogoHeader = (e: any) => {
    console.log("event", e.target.value);
    setSizeLogoHeader(e.target.value);
  };
  const onHandleChangeSizeLogoFooter = (e: any) => {
    console.log("event", e.target.value);
    setSizeLogoFooter(e.target.value);
  };

  const onSubmit = async (data: any) => {
    try {
      if (image == "") {
        const dataSettings = {
          ...data,
          url: previewSource,
        };
        await edit(dataSettings);
        toast.success("C???p nh???t th??nh c??ng!");
      } else {
        const file = previewSource;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", UPLOAD_PRESETS);
          const response = await axios.post(CLOUDINARY_API, formData, {
            headers: {
              "Content-Type": "application/form-data",
            },
          });

          const dataBlog = {
            ...data,
            url: response.data.url,
          };
          await edit(dataBlog);
          toast.success("C???p nh???t th??nh c??ng!");
        }
      }
    } catch (error) {
      toast.error("Kh??ng ?????i ???????c c??i ?????t");
      toast.error(
        "???? c?? l???i x???y ra khi Upload ???nh l??n Online. Vui l??ng check l???i Cloudinary c??n dung l?????ng kh??? d???ng kh??ng r???i li??n h??? v???i ng?????i qu???n tr??? Website"
      );
    }
  };

  if (error) return <div className="">{error}</div>;

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Menu </Breadcrumb.Item>
        <Breadcrumb.Item>Danh s??ch menu</Breadcrumb.Item>
      </Breadcrumb>
      <div className="">
        <div className={stylesAdmin["header-top-table"]}>
          <h2 className={stylesAdmin["title-admin"]}>
            Qu???n l?? giao di???n website
          </h2>
        </div>
        <main>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div className={styles["setting-ui-container"]}>
              <div className="">
                <h2 className="mb-0">C??i ?????t</h2>
                <div className={styles["setting-ui-content"]}>
                  <div className="">
                    <h4>Thay ?????i logo</h4>
                    <div className={stylesAdmin["form-input-section"]}>
                      <div className={stylesAdmin["form-upload-section"]}>
                        <input
                          type="file"
                          onChange={(e) => handleChangeImage(e)}
                          value={image}
                          className={stylesAdmin["form__input"]}
                        />
                      </div>
                    </div>
                    <div className={stylesAdmin["form-input-section"]}>
                      <label className={stylesAdmin["form__label"]}>
                        K??ch th?????c logo ch??nh
                        <div className="ml-2 tooltip tooltip-warning" data-tip="Maximum 150px, l??u ?? nh???p k??m theo ????n v???">
                          <Icon.QuestionCircleFill className="text-red-500"/>
                        </div>
                      </label>
                      <input
                        {...register("sizeLogoHeader")}
                        onKeyUp={onHandleChangeSizeLogoHeader}
                        placeholder="VD: 10px, 2rem,..."
                        className={`border ${stylesAdmin["form__input"]}`}
                      />
                    </div>
                    <div className={stylesAdmin["form-input-section"]}>
                      {previewSource ? (
                        <img
                          style={{ width: sizeLogoHeader! }}
                          id="img-preview"
                          src={previewSource}
                          alt=""
                          className={styles["setting__img-logo"]}
                        />
                      ) : (
                        <img
                          id="img-preview"
                          style={{ width: sizeLogoHeader! }}
                          className={stylesAdmin["form__img"]}
                          src="https://i.imgur.com/MV2djzI.png"
                          alt=""
                        />
                      )}
                    </div>
                    <div className={stylesAdmin["form-input-section"]}>
                      <label className={stylesAdmin["form__label"]}>
                        K??ch th?????c logo ch??n trang  
                        <div className="ml-2 tooltip tooltip-warning" data-tip="Maximum 270px, l??u ?? nh???p k??m theo ????n v???">
                          <Icon.QuestionCircleFill className="text-red-500"/>
                        </div>
                      </label>
                      <input
                        {...register("sizeLogoFooter")}
                        onKeyUp={onHandleChangeSizeLogoFooter}
                        placeholder="VD: 10px, 2rem,..."
                        className={`border ${stylesAdmin["form__input"]}`}
                      />
                    </div>
                    <div className={stylesAdmin["form-input-section"]}>
                      {previewSource ? (
                        <img
                          style={{ width: sizeLogoFooter }}
                          id="img-preview"
                          src={previewSource}
                          alt=""
                          className={styles["setting__img-logo"]}
                        />
                      ) : (
                        <img
                          id="img-preview"
                          style={{ width: sizeLogoFooter }}
                          className={stylesAdmin["form__img"]}
                          src="https://i.imgur.com/MV2djzI.png"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles["setting-color"]}>
                    <h4>M??u s???c</h4>
                    <div>
                      <div className={stylesAdmin["form-input-section"]}>
                        <div className={styles["setting-color-slice"]}>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u n???n ph???n tr??n c??ng
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("bgTop")}
                                onChange={(e) =>
                                  onHandleChangeColorBg("bgTop", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u ch??? ph???n tr??n c??ng
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("textTop")}
                                onChange={(e) =>
                                  onHandleChangeColor("textTop", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u n???n Menu
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("bgHeader")}
                                onChange={(e) =>
                                  onHandleChangeColorBg("bgHeader", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u ch??? Menu
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("textMenu")}
                                onChange={(e) =>
                                  onHandleChangeColor("textMenu", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u ch??? Menu HOVER
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("textMenuHover")}
                                onChange={(e) =>
                                  onHandleChangeColor("textMenuHover", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u ch??? logo
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("textLogo")}
                                onChange={(e) =>
                                  onHandleChangeColor("textLogo", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u n???n th??n trang
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("bgMain")}
                                onChange={(e) =>
                                  onHandleChangeColorBg("bgMain", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u n???n th??n trang b??n trong
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("bgMainContent")}
                                onChange={(e) =>
                                  onHandleChangeColorBg("bgMainContent", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u ch??? th??n trang (ch??nh)
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("textMain")}
                                onChange={(e) =>
                                  onHandleChangeColor("textMain", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u ch??? link
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("textMainLink")}
                                onChange={(e) =>
                                  onHandleChangeColor("textMainLink", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u n???n ch??n trang
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("bgFooter")}
                                onChange={(e) =>
                                  onHandleChangeColorBg("bgFooter", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u ch??? ch??n trang
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("textFooter")}
                                onChange={(e) =>
                                  onHandleChangeColor("textFooter", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u ch??? link ch??n trang
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("textLinkFooter")}
                                onChange={(e) =>
                                  onHandleChangeColor("textLinkFooter", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u n???n ch??n trang d?????i c??ng
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("bgFooterBottom")}
                                onChange={(e) =>
                                  onHandleChangeColorBg("bgFooterBottom", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                          <div className={styles["setting-color-slice-item"]}>
                            <label
                              className={styles["setting-color-slice__label"]}
                            >
                              M??u ch??? ch??n trang d?????i c??ng
                            </label>
                            <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                              <input
                                type="color"
                                {...register("textFooterBottom")}
                                onChange={(e) =>
                                  onHandleChangeColor("textFooterBottom", e)
                                }
                                className={styles["setting-color__input-color"]}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <h2 className="mb-0">Xem tr?????c</h2>
                <div className={styles["setting-ui-content"]}>
                  <div className="">
                    <h4>S???a Logo</h4>
                    <div className={stylesAdmin["form-input-section"]}>
                      <label className={stylesAdmin["form__label"]}>
                        T??n Logo
                      </label>
                      <input
                        {...register("text")}
                        className={`border ${stylesAdmin["form__input"]}`}
                      />
                    </div>
                    <div className={stylesAdmin["form-input-section"]}>
                      <label className={stylesAdmin["form__label"]}>
                        Sub logo
                      </label>
                      <input
                        {...register("subTextLogo")}
                        className={`border ${stylesAdmin["form__input"]}`}
                      />
                    </div>
                    <div className={stylesAdmin["form-input-section"]}>
                      <label className={stylesAdmin["form__label"]}>
                        Gi???i thi???u website
                      </label>
                      <input
                        {...register("intro")}
                        className={`border ${stylesAdmin["form__input"]}`}
                      />
                    </div>
                  </div>
                  <div className={styles["setting-ui-content-button"]}>
                    <h4>M??u button</h4>
                    <div
                      className={styles["setting-ui-content-button-container"]}
                    >
                      <div
                        className={
                          styles["setting-ui-content-button-container-item"]
                        }
                      >
                        <span>Button</span>
                        <div className="flex items-center">
                          <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                            <input
                              type="color"
                              {...register("bgBtn")}
                              onChange={(e) =>
                                onHandleChangeColorBg("bgBtn", e)
                              }
                              className={styles["setting-color__input-color"]}
                            />
                          </Tooltip>
                          <button
                            id="bgBtn"
                            className={styles["setting-ui-content-button-item"]}
                          >
                            Button Icon
                          </button>
                        </div>
                      </div>
                      <div
                        className={
                          styles["setting-ui-content-button-container-item"]
                        }
                      >
                        <span>Button khi hover</span>
                        <div className="flex items-center">
                          <Tooltip placement="top" title={"Ch???n m??u kh??c"}>
                            <input
                              type="color"
                              {...register("bgBtnHover")}
                              onChange={(e) =>
                                onHandleChangeColorBg("bgBtnHover", e)
                              }
                              className={styles["setting-color__input-color"]}
                            />
                          </Tooltip>
                          <button
                            id="bgBtnHover"
                            className={styles["setting-ui-content-button-item"]}
                          >
                            Button Icon
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <h4>M??u website</h4>
                    <div className={styles["setting-ui-content-view"]}>
                      <div
                        className={styles["setting-ui-content-view-container"]}
                      >
                        <div
                          className={styles["setting-ui-content-view-header"]}
                        >
                          <div
                            id="bgTop"
                            className={
                              styles["setting-ui-content-view-header-top"]
                            }
                          >
                            <p id="textTop">M??u ch??? ph???n tr??n c??ng</p>
                          </div>
                        </div>
                        <div
                          id="bgHeader"
                          className={
                            styles["setting-ui-content-view-header-main"]
                          }
                        >
                          <div
                            className={
                              styles["setting-ui-content-view-header-logo"]
                            }
                          >
                            <img
                              className={
                                styles["setting-ui-content-view-header-img"]
                              }
                              src={previewSource}
                              alt=""
                            />
                            <span
                              id="textLogo"
                              className={
                                styles[
                                  "setting-ui-content-view-header-logo-text"
                                ]
                              }
                            >
                              Logo text
                            </span>
                          </div>
                          <div className="">
                            <ul
                              id="textMenu"
                              className={
                                styles["setting-ui-content-view-header-menu"]
                              }
                            >
                              <li>Menu</li>
                              <li>Menu</li>
                              <li>Menu</li>
                            </ul>
                          </div>
                        </div>
                        <div
                          id="bgMain"
                          className={styles["setting-ui-content-view-main"]}
                        >
                          <div
                            id="bgMainContent"
                            className={
                              styles["setting-ui-content-view-main-inside"]
                            }
                          >
                            <p
                              id="textMain"
                              className={
                                styles["setting-ui-content-view-main-text"]
                              }
                            >
                              M??u ch??? th??n trang
                            </p>
                            <p
                              id="textMainLink"
                              className={
                                styles["setting-ui-content-view-main-text-link"]
                              }
                            >
                              M??u link th??n trang
                            </p>
                          </div>
                          <div
                            id="bgMainContent2"
                            className={
                              styles["setting-ui-content-view-main-inside"]
                            }
                          >
                            <p
                              id="textMain2"
                              className={
                                styles[
                                  "setting-ui-content-view-aside-text-link"
                                ]
                              }
                            >
                              M??u ch??? th??n trang
                            </p>
                            <p
                              id="asideLink"
                              className={
                                styles[
                                  "setting-ui-content-view-aside-text-link"
                                ]
                              }
                            >
                              M??u link aside
                            </p>
                          </div>
                        </div>
                        <div
                          id="bgFooter"
                          className={styles["setting-ui-content-view-footer"]}
                        >
                          <img
                            className={
                              styles["setting-ui-content-view-footer-img"]
                            }
                            src={previewSource}
                            alt=""
                          />
                          <p
                            id="textFooter"
                            className={
                              styles["setting-ui-content-view-footer-text-link"]
                            }
                          >
                            M??u ch??? ch??n trang
                          </p>
                          <p
                            id="textLinkFooter"
                            className={
                              styles["setting-ui-content-view-footer-text-link"]
                            }
                          >
                            M??u link ch??n trang
                          </p>
                        </div>
                        <div
                          id="bgFooterBottom"
                          className={
                            styles["setting-ui-content-view-footer-bottom"]
                          }
                        >
                          <p
                            id="textFooterBottom"
                            className={
                              styles[
                                "setting-ui-content-view-footer-bottom-text-link"
                              ]
                            }
                          >
                            M??u ch??? ch??n trang d?????i c??ng
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={stylesAdmin["form-input-section"]}>
                    <label className={stylesAdmin["form__label"]}>
                      Link Facebook
                    </label>
                    <input
                      // onKeyUp={(e) => createSlug(e)}
                      {...register("urlFb")}
                      className={`border ${stylesAdmin["form__input"]}`}
                    />
                  </div>
                  <div className={stylesAdmin["form-input-section"]}>
                    <label className={stylesAdmin["form__label"]}>
                      Link Youtube
                    </label>
                    <input
                      {...register("urlYt")}
                      className={`border ${stylesAdmin["form__input"]}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${stylesAdmin["form-input-section"]} ${stylesAdmin["form-input-section--button"]} ${styles["setting-button-section"]}`}
            >
              <Button type="primary" htmlType="submit">
                L??u thay ?????i
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};
WebsiteColor.Layout = LayoutAdmin;

export default WebsiteColor;
