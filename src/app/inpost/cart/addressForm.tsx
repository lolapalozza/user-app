import {useState} from "react";

export const AddressForm = ({createInpost}) => {

  const [formErrors, setFormErrors] = useState({})

  const inputInvalidClasses = "w-full h-9 mb-2 p-1 rounded text-black bg-red-200"
  const inputValidClasses = "w-full h-9 mb-2 p-1 rounded text-black"

  const onSubmit = async(e) => {
    e.preventDefault();

    const email = e.target.form.email.value;
    const phone = e.target.form.phone.value;
    const pachkomat = e.target.form.pachkomat.value

    const _formErrors = {}
    if(!email){
      _formErrors.email = {required: true}
    }
    if(!pachkomat){
      _formErrors.pachkomat = {required: true}
    }
    if(Object.keys(_formErrors).length){
      return setFormErrors(_formErrors)
    }
    createInpost({email, phone, pachkomat})
  }

  return <>
    <h2>
      Enter your data
    </h2>
    <div className="p-4 w-full">
      <form className="text-center">
        <input className={formErrors.email?.required ? inputInvalidClasses : inputValidClasses} name="email" placeholder="Email*"/>
        {formErrors.email?.required && <div className="text-xs text-red-300 text-left mb-2">
          Email is required
        </div>}
        <input className="w-full h-9 mb-2 p-1 rounded text-black" name="phone" placeholder="Phone Number"/>
        <input className={formErrors.pachkomat?.required ? inputInvalidClasses : inputValidClasses} name="pachkomat" placeholder="Pachkomat*"/>
        {formErrors.pachkomat?.required && <div className="text-xs text-red-300 text-left mb-2">
          Pachkomat is required
        </div>}
        <div className="text-left text-blue-300">
          <a target="_blank" href="https://inpost.pl/znajdz-paczkomat">Find your pachkomat</a>
        </div>

        <button className="border-2 mt-5 p-2 color-white rounded" onClick={onSubmit}>
          Place Order
        </button>

      </form>
    </div>
  </>
}
