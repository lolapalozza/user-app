import {useCallback, useState} from "react";
import PlaceOrderButton from "@/app/inpost/cart/PlaceOrderButton";
import {Loading} from "@/shared/Loading";

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const AddressForm = ({createInpost}) => {

  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [pachkomat, setPachkomat] = useState("")

  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const inputInvalidClasses = "w-full h-9 mb-2 p-1 rounded text-black bg-red-200"
  const inputValidClasses = "w-full h-9 mb-2 p-1 rounded text-black"

  const onSubmit = async(e) => {

    e.preventDefault()

    setLoading(true)

    // if(process.env.NEXT_PUBLIC_ENV === 'local'){
    //   e.preventDefault()
    // }

    const _formErrors = {}
    if(!email){
      _formErrors.email = {required: true}
    }else{
      if(!isValidEmail(email)){
        _formErrors.email = {pattern: true}
      }
    }
    if(!pachkomat){
      _formErrors.pachkomat = {required: true}
    }
    if(Object.keys(_formErrors).length){
      setLoading(false)
      return setFormErrors(_formErrors)
    }
    const result = await createInpost({email, phone, pachkomat})
    if(result.success){
      setLoading(false)
    }
  }

  return <div className="p-4 w-full">
    <form className="text-center">
      <h2 className="mb-10">
        Введите данные заказа:
      </h2>
      <input className={(formErrors.email?.required || formErrors.email?.pattern) ? inputInvalidClasses : inputValidClasses} name="email"
             placeholder="Email*"
             value={email}
             onChange={(e) => setEmail(e.target.value)}/>
      {formErrors.email?.required && <div className="text-xs text-red-300 text-left mb-2">
        Введите Email
      </div>}
      {formErrors.email?.pattern && <div className="text-xs text-red-300 text-left mb-2">
        Введите существующий Email
      </div>}
      <input className="w-full h-9 mb-2 p-1 rounded text-black" name="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className={formErrors.pachkomat?.required ? inputInvalidClasses : inputValidClasses} name="pachkomat"
             placeholder="Пачкомат*"
             value={pachkomat}
             onChange={(e) => setPachkomat(e.target.value)}/>
      {formErrors.pachkomat?.required && <div className="text-xs text-red-300 text-left mb-2">
        Введите пачкомат
      </div>}
      <div className="text-left text-blue-300">
        <a target="_blank" href="https://inpost.pl/znajdz-paczkomat">Найти пачкомат</a>
      </div>

      <PlaceOrderButton onSubmit={onSubmit} loading={loading} />

      { loading && <Loading /> }

    </form>
  </div>
}
