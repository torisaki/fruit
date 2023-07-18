import React from 'react'
import { Container, TextInput, Textarea, Select, Icon, Button } from 'react-materialize'

export default function Contact() {
    const handleSubmit =(e)=> {
        e.preventDefault()
      }    
  return (
    <div>
      <Container>
        <h3>Contact us</h3>
        <form onSubmit={handleSubmit}>
            <TextInput id='TextInput-38' label='Your Name'/>
            <TextInput id='TextInput-39' label='Your Phone Number'/>
            <TextInput email id='TextInput-41' label='Your Email' validate/>
            <Textarea icon={<Icon>mode_edit</Icon>} id='Textarea-28' label='Your Content'/>
            <Button>Submit</Button>
        </form>
      </Container>
    </div>
  )
}
