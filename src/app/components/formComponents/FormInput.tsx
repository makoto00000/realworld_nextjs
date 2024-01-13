type InputProps = {
  type: string,
  placeholder: string,
  name: string,
}

export default function FormInput({type, placeholder, name}: InputProps) {

  return(
    <fieldset className="form-group">
      <input className="form-control form-control-lg"
      type={type}
      placeholder={placeholder}
      name={name}/>
    </fieldset>
  )
}