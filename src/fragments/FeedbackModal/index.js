import React, { Component } from 'react'
import AutoForm from 'react-auto-form'
import submitFeatureData from './SubmitSurvey'
import Checkbox from '../../components/Checkbox/Check'
import Modal from '../../components/Modal/Modal'
import Button from '../../components/Button/Button'
import styles from './FeedbackModal.css'

export default class FeedbackModal extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      showModal: false,
    }
  }
  componentDidMount () {
    window.addEventListener('serverlessLogin', this.handleToggle, false)
  }
  componentWillUnmount () {
    window.removeEventListener('serverlessLogin', this.handleToggle)
  }
  handleToggle = () => {
    this.setState({showModal: !this.state.showModal})
  }
  onFeedbackSubmit = (event, data) => {
    event.preventDefault()
    console.log(event)
    console.log(data)
    const other = data.other
    delete data.other
    const sendData = {
      formData: data,
      other: other,
      userData: localStorage.getItem('profile') // eslint-disable-line
    }
    var that = this
    submitFeatureData(sendData, function (err, data) {
      if (err) {
        console.log('err', err)
        return false
      }
      that.setState({
        showModal: false
      })
    })
  }
  render () {
    return (
      <Modal
        active={this.state.showModal}
        onEscKeyDown={this.handleToggle}
        onOverlayClick={this.handleToggle}
        title='Thanks for signing up for the Beta!'
      >
        <h3>Which products are you interested in?</h3>
        <div>
          <AutoForm onSubmit={this.onFeedbackSubmit} trimOnSubmit>
            <Checkbox name={'monitoring'} label={'Serverless Application Monitoring'} />
            <Checkbox name={'secret_manager'} label={'Serverless Secrets Manager'} />
            <Checkbox name={'on_premise'} label={'Serverless On-premise'} />
            <textarea className={styles.textarea} name='other' placeholder='Interested in other serverless tooling? Let us know' />
            <span className={styles.feedbackSubmit}>
              <Button kind='black' className={styles.btn}>
                Submit form
              </Button>
            </span>
          </AutoForm>
        </div>
      </Modal>
    )
  }
}
