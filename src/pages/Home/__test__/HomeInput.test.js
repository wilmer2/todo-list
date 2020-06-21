import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import HomeInput from '../components/HomeInput';
import AddTaskButtom from '../components/AddTaskButton';

describe('src/pages/Home/components/HomeInput', () => {
  let handleOnChangeTaskName;
  let handleOnSubmitAddTask;

  beforeEach(() => {
    handleOnChangeTaskName = sinon.spy();
    handleOnSubmitAddTask = sinon.spy();
  });

  it('should render', () => {
    const loading = false;
    const taskName = '';

    const wrapper = shallow(<HomeInput 
      onChangeTaskName={handleOnChangeTaskName}
      onSubmitAddTask={handleOnSubmitAddTask}
      loading={loading}
      taskName={taskName}
    />);

    const inputContainer = wrapper.find('.todo-home__input-container');
    const form = inputContainer.find('form');
    const input = form.find('.todo-home__input');
    const addTaskButton = form.find(AddTaskButtom);

    expect(inputContainer.length).to.equals(1);
    expect(form.length).to.equals(1);
    expect(input.length).to.equals(1);
    expect(input.prop('disabled')).to.equals(false);
    expect(addTaskButton).to.be.present();
    expect(addTaskButton.props().loading).to.equals(false);
  });

  it('should call handleOnSubmitAddTask when submit data', () => {
    const loading = false;
    const taskName = 'Nueva tarea';

    const wrapper = shallow(<HomeInput 
      onChangeTaskName={handleOnChangeTaskName}
      onSubmitAddTask={handleOnSubmitAddTask}
      loading={loading}
      taskName={taskName}
    />);

    wrapper.find('form').simulate('submit', {
      preventDefault() {

      },
    });

    expect(handleOnSubmitAddTask.called).to.equals(true);
  });

  it('should call handleOnChangeTaskName when change data', () => {
    const loading = false;
    const taskName = 'Nueva tarea';

    const wrapper = shallow(<HomeInput 
      onChangeTaskName={handleOnChangeTaskName}
      onSubmitAddTask={handleOnSubmitAddTask}
      loading={loading}
      taskName={taskName}
    />);

    wrapper.find('form').find('.todo-home__input').simulate('change', {
      target: { value: 'another value' }
    });

    expect(handleOnChangeTaskName.called).to.equals(true);
  });

  it('disabled input and AddTaskButton when loading is true', () => {
    const loading = true;
    const taskName = 'Nueva tarea';

    const wrapper = shallow(<HomeInput 
      onChangeTaskName={handleOnChangeTaskName}
      onSubmitAddTask={handleOnSubmitAddTask}
      loading={loading}
      taskName={taskName}
    />);
    
    
    const form = wrapper.find('form');
    const addTaskButton = form.find(AddTaskButtom);
    
    expect(form.find('.todo-home__input').prop('disabled')).to.equals(true);
    expect(addTaskButton.props().loading).to.equals(true);
  });
});
