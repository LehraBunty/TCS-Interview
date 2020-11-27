import React, { useState, useEffect } from "react";
import "./style.css";
import {
  Form,
  TextField,
  SelectField,
  SubmitButton,
  TextAreaField
} from "./Form";
import * as Yup from "yup";

const formSchema = {
  BUUnit: {
    type: "select",
    label: "BU Unit: ",
    required: true,
    options: [
      {
        label: "Information Technology",
        value: "It"
      },
      {
        label: "Support",
        value: "Support"
      }
    ]
  },
  Subunit: {
    type: "select",
    label: "Sub BU: ",
    required: true,
    options: [
      {
        label: "Software",
        value: "Software"
      },
      {
        label: "Network Solution",
        value: "Solution"
      }
    ]
  },
  name: {
    type: "text",
    label: "Name",
    required: true
  },
  email: {
    type: "email",
    label: "Email",
    required: true
  },

  address: {
    type: "textarea",
    label: "address",
    required: false
  },
  description: {
    type: "textarea",
    label: "description",
    required: true
  },

  submit: {
    type: "submit",
    label: "save",
    value: "Submit"
  }
};

function App() {
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    initForm(formSchema);
  }, []);

  const initForm = formSchema => {
    let _formData = {};
    let _validationSchema = {};

    for (var key of Object.keys(formSchema)) {
      _formData[key] = "";

      if (formSchema[key].type === "text") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "email") {
        _validationSchema[key] = Yup.string().email();
      } else if (formSchema[key].type === "select") {
        _validationSchema[key] = Yup.string().oneOf(
          formSchema[key].options.map(o => o.value)
        );
      } else if (formSchema[key].type === "number") {
        _validationSchema[key] = Yup.number();
      } else if (formSchema[key].type === "textarea") {
        _validationSchema[key] = Yup.string();
      }

      if (formSchema[key].required) {
        _validationSchema[key] = _validationSchema[key].required("Required");
      }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  const getFormElement = (elementName, elementSchema) => {
    const props = {
      name: elementName,
      label: elementSchema.label,
      options: elementSchema.options
    };

    if (
      elementSchema.type === "text" ||
      elementSchema.type === "email" ||
      elementSchema.type === "number"
    ) {
      return <TextField {...props} />;
    }

    if (elementSchema.type === "select") {
      return <SelectField {...props} />;
    }

    if (elementSchema.type === "textarea") {
      return <TextAreaField {...props} />;
    }

    if (elementSchema.type === "submit") {
      return <SubmitButton {...props} />;
    }
  };

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="App">
      <Form
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {Object.keys(formSchema).map((key, ind) => (
          <div key={key}>{getFormElement(key, formSchema[key])}</div>
        ))}
      </Form>
    </div>
  );
}

export default App;
