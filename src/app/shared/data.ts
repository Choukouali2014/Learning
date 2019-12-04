export const validationMessage = {
  fullName: {
    required: 'Full Name is required.',
    minlength: 'Full Name must be greater than 2 characters.',
    maxlength: 'Full Name must be less than 10 characters.',
  },
  firstName: {
    required: 'First Name is required.',
    minlength: 'First Name must be greater than 2 characters.',
    maxlength: 'First Name must be less than 14 characters.',
  },
  lastName: {
    required: 'Last Name is required.',
    minlength: 'Last Name must be greater than 2 characters.',
    maxlength: 'Last Name must be less than 14 characters.',
  },
  email : {
    required : 'Email is required.',
    pattern : 'Email Domain should be example@gmail.com.',
    emailDomain: 'Email Domain should be example@hcl.com',
    email: 'Email must be a valid email address'
  },
  confirmEmail : {
    required : 'Email is required.',
    emailDomain: 'Email Domain should be example@hcl.com'
  },
  emailGroup: {
    emailMistMatch: 'Email and Confirm Email do not match'
  },
  phone : {
    required : 'Phone is required.',
  },
  address : {
    required : 'Address is required.',
  },
  city : {
    required : 'City is required.',
  },
  state : {
    required : 'State is required.',
  },
  zip : {
    required : 'Zip Code is required.',
  },
  password : {
    required : 'Password is required.',
    minlength: 'Password must be greater than 2 characters.',
  },
  Confirmpassword : {
    required : 'Confirmation Password is required.',
    minlength: 'Confirmation Password must be greater than 6 characters.',
    mustMatch: 'Passwords must match'
  },
  username : {
    required : 'Username is required.',
    minlength: 'Confirmation Password must be greater than 6 characters.'
    
  },
  course:{
    required : 'Course is required.',
  }
};

export const formErrors = {
  fullName : '',
  email : '',
  confirmEmail : '',
  emailGroup: '',
  phone : '',
  preference : '',
  password: '',
  username:'',
  course:'',
  Confirmpassword:'',
  mustMatch:''
};
