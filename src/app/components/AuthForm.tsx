
import { useFormState } from "react-dom";
import { ActionState, loginAction } from "../utils/actions";
import FormErrors from "./formComponents/FormErrors";

type AuthFormProps = {
  title: string,
  link: string,
  linkText: string,
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>
  inputs: JSX.Element[],
  buttonText: string,
};

export default function AuthForm({title, link, linkText, action, inputs, buttonText}: AuthFormProps) {
  const [formState, formAction] = useFormState(action, {
    errors: null,
    user: null,
  });

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{title}</h1>
            <p className="text-xs-center">
              <a href={link}>{linkText}</a>
            </p>

            {formState.errors ? <FormErrors {...formState.errors} /> : ""}

            <form action={formAction}>
              {inputs.map((input) => (input))}
              <button className="btn btn-lg btn-primary pull-xs-right">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
