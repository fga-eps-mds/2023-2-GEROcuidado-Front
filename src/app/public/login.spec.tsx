import { render } from '@testing-library/react-native'
import Login from './login'

describe('<Login/>', () => {
 it('should be defined', () => {
  const component = render(<Login />)
   expect(component).toBeTruthy()
   expect(component).toBeDefined()
 })
})