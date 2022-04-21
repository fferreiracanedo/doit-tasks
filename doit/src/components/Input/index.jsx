import { Container, InputContainer } from '../../components/Input/styles.js'

const Input = ({ label, icon: Icon, register, name, error, ...rest }) => {
  return (
    <Container>
      <div>
        {label} {!!error && <span> - {error} </span>}
      </div>
      <InputContainer isErrored={!!error}>
        {Icon && <Icon size={20} />}
        <input {...register(name)} {...rest}></input>
      </InputContainer>
    </Container>
  )
}
export default Input
