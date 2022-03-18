**Form Component**

An abstract component which buttons which acts as a form, allowing data to be passed down and rendered as form inputs

**State**
        
    loading:[Bool] - Renders form based on whether or not its loading

    has_loaded:[Bool] - True when form loaded, currently reserved

    data:[Obj[str: str]] - Form state mapping strings aka inputs to their input values

    errors:[Obj[str: str]] - Form state mapping strings aka inputs to their  error values
    
    labels:[Obj[str: str]] - Form state mapping strings aka inputs to their labels

    inputtype:[Obj[str: str]] - Form state mapping strings aka inputs to their input type (eg. Number, File, Text)

    formError:[str] - The name of the error key which will be passed from the backend 

**Form Field**

An abstract component which constructs inputs from a given set of field props

**Props**
        
    error:[str] - The error for the field

    name:[str] - Name of the field

    label:[str] - Label for the field

    value:[str] - Value for the field

    type:[str] - Type for the field (eg. Number, Text, File)

    handleChange:[function] - Function which handles change on the input value and communicates with form state to keep things synchronous

**Form Input**

An component which creates an input from a given set of field props

**Props**
        
    error:[str] - The error for the field

    name:[str] - Name of the field

    label:[str] - Label for the field

    value:[str] - Value for the field

    type:[str] - Type for the field (eg. Number, Text, File)

    handleChange:[function] - Function which handles change on the input value and communicates with form state to keep things synchronous

**Form Error**

An component which generates a whole form's error field

**Props**
        
    error:[str] - The error for the form
