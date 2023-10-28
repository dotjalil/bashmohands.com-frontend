import "./BookSession.css";
import { useState } from "react";
import {
  Button,
  Col,
  Modal,
  Row,
  Steps,
  Flex,
  Avatar,
  ConfigProvider,
  theme,
  message,
  DatePicker,
  TimePicker,
  Select,
  Input,
} from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import sendBookingRequest from "../../../shared/model/sendBookingRequest";

const { TextArea } = Input;

function StepOne({ date, setDate, time, setTime }) {
  const handleDatePicker = (date, dateString) => {
    setDate(date);
  };

  return (
    <>
      <h1 style={{ fontSize: "22px", marginTop: "36px" }}>
        Schedule your session
      </h1>
      <DatePicker
        value={date}
        format="DD/MM/YYYY"
        onChange={handleDatePicker}
        placement="bottomLeft"
        style={{ marginTop: "14px", height: "50px", width: "100%" }}
      />
      <Select
        showSearch
        value={time}
        placeholder="Select time"
        style={{ width: "100%", height: "50px", marginTop: "23px" }}
        suffixIcon={<ClockCircleOutlined />}
        onChange={(timeString) => {
          setTime(timeString);
        }}
        options={[
          { value: "00:00", label: "00:00" },
          { value: "00:30", label: "00:30" },
          { value: "01:00", label: "01:00" },
          { value: "01:30", label: "01:30" },
          { value: "02:00", label: "02:00" },
          { value: "02:30", label: "02:30" },
          { value: "03:00", label: "03:00" },
          { value: "03:30", label: "03:30" },
          { value: "04:00", label: "04:00" },
          { value: "04:30", label: "04:30" },
          { value: "05:00", label: "05:00" },
          { value: "05:30", label: "05:30" },
          { value: "06:00", label: "06:00" },
          { value: "06:30", label: "06:30" },
          { value: "07:00", label: "07:00" },
          { value: "07:30", label: "07:30" },
          { value: "08:00", label: "08:00" },
          { value: "08:30", label: "08:30" },
          { value: "09:00", label: "09:00" },
          { value: "09:30", label: "09:30" },
          { value: "10:00", label: "10:00" },
          { value: "10:30", label: "10:30" },
          { value: "11:00", label: "11:00" },
          { value: "11:30", label: "11:30" },
          { value: "12:00", label: "12:00" },
          { value: "12:30", label: "12:30" },
          { value: "13:00", label: "13:00" },
          { value: "13:30", label: "13:30" },
          { value: "14:00", label: "14:00" },
          { value: "14:30", label: "14:30" },
          { value: "15:00", label: "15:00" },
          { value: "15:30", label: "15:30" },
          { value: "16:00", label: "16:00" },
          { value: "16:30", label: "16:30" },
          { value: "17:00", label: "17:00" },
          { value: "17:30", label: "17:30" },
          { value: "18:00", label: "18:00" },
          { value: "18:30", label: "18:30" },
          { value: "19:00", label: "19:00" },
          { value: "19:30", label: "19:30" },
          { value: "20:00", label: "20:00" },
          { value: "20:30", label: "20:30" },
          { value: "21:00", label: "21:00" },
          { value: "21:30", label: "21:30" },
          { value: "22:00", label: "22:00" },
          { value: "22:30", label: "22:30" },
          { value: "23:00", label: "23:00" },
          { value: "23:30", label: "23:30" },
        ]}
      />
    </>
  );
}

function StepTwo({ schedule, setNotes, notes }) {
  const { date, time } = schedule;
  console.log(date, date.$d.getDay());
  return (
    <>
      <h1 style={{ fontSize: "22px", marginTop: "36px" }}>
        Schedule your session
      </h1>
      <Flex vertical={true}>
        <p>Date & Time</p>
        <Flex>
          <Flex style={{ width: "50%" }} gap={10}>
            <CalendarOutlined />
            <span style={{ fontWeight: "medium" }}>
              {date.$d.toDateString()}
            </span>
          </Flex>
          <Flex style={{ width: "50%" }} gap={10}>
            <CalendarOutlined />
            <span>{time}</span>
          </Flex>
        </Flex>
      </Flex>
      <Flex vertical={true}>
        <p style={{ fontWeight: "bold", marginTop: "34px" }}>
          Do you have any notes? (optional)
        </p>
        <TextArea
          value={notes}
          onChange={setNotes}
          rows={4}
          placeholder="Feel free to write whatever comes to your mind, you can also ask your instructor any questions you have in mind."
          maxLength={6}
        />{" "}
      </Flex>
    </>
  );
}

export default function BookModal() {
  const [bookingState, setBookingState] = useState({
    model: {
      date: null,
      time: null,
      notes: null,
      submitted: false,
    },
    ui: {
      step: 0,
      finished: false,
      showModal: false,
      submitting: false,
    },
  });

  // Model methods
  const setDate = (dateString) => {
    setBookingState((prevBookingState) => {
      return {
        ...prevBookingState,
        model: {
          ...prevBookingState.model,
          date: dateString,
        },
      };
    });
  };

  const setTime = (timeString) => {
    console.log(timeString);
    setBookingState((prevBookingState) => {
      return {
        ...prevBookingState,
        model: {
          ...prevBookingState.model,
          time: timeString,
        },
      };
    });
  };

  const setNotes = (e) => {
    setBookingState((prevBookingState) => {
      return {
        ...prevBookingState,
        model: {
          ...prevBookingState.model,
          notes: e.target.value,
        },
      };
    });
  };

  const steps = [
    {
      key: 0,
      title: "Select Date & Time",
      // Step 1 element goes here
      content: (
        <StepOne
          date={bookingState.model.date}
          setDate={setDate}
          time={bookingState.model.time}
          setTime={setTime}
        />
      ),
    },
    {
      key: 1,
      title: "Review & Confirm",
      // Step 2 element goes here
      content: (
        <StepTwo
          setNotes={setNotes}
          notes={bookingState.model.notes}
          schedule={bookingState.model}
        />
      ),
    },
  ];

  function ThankYou() {
    // Thank you content goes here
    return <h1>Thank You</h1>;
  }

  const handleStartBooking = () => {
    setBookingState((prevBookingState) => {
      return {
        ...prevBookingState,
        ui: {
          ...prevBookingState.ui,
          showModal: true,
        },
      };
    });
  };

  const handleCancelBooking = () => {
    setBookingState((prevBookingState) => {
      return {
        ...prevBookingState,
        ui: {
          ...prevBookingState.ui,
          showModal: false,
        },
      };
    });
  };

  const nextStep = () => {
    if (bookingState.ui.step === steps.length - 1) {
      // send server request here
      // render finish screen
      //    If success, or error
      setBookingState((prevBookingState) => {
        return {
          ...prevBookingState,
          ui: {
            ...prevBookingState.ui,
            finished: true,
          },
        };
      });
      console.log("Finished!");
    }
    setBookingState((prevBookingState) => {
      return {
        ...prevBookingState,
        ui: {
          ...prevBookingState.ui,
          step: prevBookingState.ui.step + 1,
        },
      };
    });
  };

  const prevStep = () => {
    setBookingState((prevBookingState) => {
      return {
        ...prevBookingState,
        ui: {
          ...prevBookingState.ui,
          step: prevBookingState.ui.step - 1,
        },
      };
    });
  };

  const setSubmitting = (bool) => {
    setBookingState((prevBookingState) => {
      return {
        ...prevBookingState,
        ui: {
          ...prevBookingState.ui,
          submitting: bool,
        },
      };
    });
  };

  const setFinished = () => {
    setBookingState((prevBookingState) => {
      return {
        ...prevBookingState,
        model: {
          ...prevBookingState.model,
          submitted: true,
        },
        ui: {
          ...prevBookingState.ui,
          finished: true,
          submitting: false,
        },
      };
    });
  };

  async function onSubmit() {
    // message.success("Processing complete!");
    setSubmitting(true);
    console.log("Submitted", bookingState.model);
    // send request here
    const res = await sendBookingRequest({
      instructor: "1",
      client: "0",
      date: bookingState.model.schedule,
      notes: bookingState.model.notes,
    });
    setFinished(true);
  }

  return (
    <>
      <div className="btns">
        <button className="call-btn" onClick={handleStartBooking}>
          <img src="imgs/7.svg" alt="" />
          Schedule FREE Call
        </button>
        <button className="cv">
          <img src="imgs/8.svg" className="cv-img" alt="" />
        </button>
      </div>
      <ConfigProvider
        theme={{
          token: {
            borderRadiusLG: 12,
          },
        }}
      >
        <Modal
          centered
          open={bookingState.ui.showModal}
          width={1000}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
          onCancel={handleCancelBooking}
          footer={[]}
          maskClosable={false}
        >
          <Row style={{ padding: "20px 25px", minHeight: "500px" }}>
            <Col span={9} style={{ borderRight: "1px solid #F1F1F1" }}>
              <Flex
                vertical={false}
                gap={10}
                style={{
                  borderBottom: "1px solid #F1F1F1",
                  marginRight: "30px",
                }}
              >
                <Avatar
                  size={{ xs: 16, sm: 10, md: 20, lg: 80, xl: 85, xxl: 90 }}
                  src={
                    "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
                  }
                />
                <Flex vertical={true} justify="center">
                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {"firstName" + " " + "lastName"}
                  </div>
                  <p style={{ fontSize: "14px", color: "#17080E", margin: 0 }}>
                    {"title" + " at " + "company"}
                  </p>
                </Flex>
              </Flex>
            </Col>
            <Col span={15} style={{ paddingLeft: "40px", paddingTop: "20px" }}>
              {bookingState.ui.finished && <ThankYou />}
              {!bookingState.ui.finished && (
                <BookingSteps
                  steps={steps}
                  current={bookingState.ui.step}
                  next={nextStep}
                  prev={prevStep}
                  onSubmit={onSubmit}
                  submitting={bookingState.ui.submitting}
                  date={bookingState.model.date}
                  time={bookingState.model.time}
                />
              )}
            </Col>
          </Row>
        </Modal>
      </ConfigProvider>
    </>
  );
}

function BookingSteps({
  steps,
  current,
  next,
  prev,
  onSubmit,
  submitting,
  date,
  time,
}) {
  //   const steps = [
  //     {
  //       title: "First",
  //       content: "First-content",
  //     },
  //     {
  //       title: "Second",
  //       content: "Second-content",
  //     },
  //     {
  //       title: "Last",
  //       content: "Last-content",
  //     },
  //   ];

  const { token } = theme.useToken();
  //   const [current, setCurrent] = useState(0);
  //   const next = () => {
  //     setCurrent(current + 1);
  //   };
  //   const prev = () => {
  //     setCurrent(current - 1);
  //   };
  //   const items = steps.map((item) => ({
  //     key: item.title,
  //     title: item.title,
  //   }));
  const contentStyle = {
    // lineHeight: "260px",
    // textAlign: "center",
    // color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    // marginTop: 16,
  };

  return (
    <>
      <Flex vertical={true} justify="space-between" style={{ height: "100%" }}>
        <Flex vertical={true}>
          <Steps type="navigation" current={current} items={steps} />
          <div style={contentStyle}>{steps[current].content}</div>
        </Flex>
        <Flex
          justify="space-between"
          style={{
            marginTop: 24,
            height: "50px",
            borderRadius: "6px",
            minWidth: "146px",
          }}
        >
          {current > 0 && (
            <Button
              type="link"
              style={{
                margin: "0 8px",
                height: "50px",
                borderRadius: "6px",
                minWidth: "146px",
                textAlign: "left",
                padding: "0",
              }}
              onClick={() => prev()}
            >
              <ArrowLeftOutlined />
              Previous
            </Button>
          )}
          {current === 0 && <div></div>}
          {current < steps.length - 1 && (
            <Button
              type="primary"
              style={{ height: "50px", borderRadius: "6px", minWidth: "146px" }}
              onClick={() => next()}
              disabled={!date || !time}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              style={{
                height: "50px",
                borderRadius: "6px",
                minWidth: "146px",
              }}
              onClick={() => {
                onSubmit();
              }}
              disabled={submitting}
            >
              Submit
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
}
