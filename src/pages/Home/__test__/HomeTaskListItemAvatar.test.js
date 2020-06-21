import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import HomeTaskListItemAvatar from '../components/HomeTaskListItemAvatar';
import HomeDropDownItem from '../components/HomeDropDownItem';

describe('src/pages/Home/components/HomeTaskListItemAvatar', () => {
  let task;
  let users;
  let handleOnChangeUser;
  let wrapper;

  beforeEach(() => {
    task = {
      id: 'ckbph8qts01m807jkge7j3qh8', 
      name: 'tarea', 
      completed: false, 
      __typename: 'Task',
      user: {
        email: 'wilmer.payall@gmail.com',
        id: 'ckbgxcr6j000507mh3c08aei0',
        __typename: 'User'
      }
    };

    users = {
      usersList: {
        items: [
          {email: 'ronald@gmail.com', id: 'ckbhc821b007s07lifcj22hju', __typename: 'User'},
          {email: 'kelly@gmail.com', id: 'ckbiwqdpw004p08jwb8hsg413', __typename: 'User'}
        ]
      },
    };
    
    handleOnChangeUser = () => {};

    wrapper = shallow(<HomeTaskListItemAvatar 
      users={users}
      task={task}
      onChangeUser={handleOnChangeUser}
    />)
  });
  
  it('should render', () => {
    const avatar = wrapper.find('.todo-home__task-item-avatar');
    expect(avatar).to.be.present();

    const imageContainer = avatar.find('.todo-home__task-item-img-container');
    expect(imageContainer).to.be.present();
    expect(imageContainer.find('.todo-home__task-item-img')).to.be.present();

    const avatarEmail = avatar.find('.todo-home__task-item-email');
    expect(avatarEmail).to.be.present();
    expect(avatarEmail.text()).to.equals(task.user.email);

    const dropDownUser = wrapper.find('.todo__dropdown-content');
    expect(dropDownUser).to.be.present();
    expect(dropDownUser.hasClass('todo__dropdown-content--show')).to.be.equal(false);

    const dropDownUserItem = dropDownUser.find(HomeDropDownItem);
    expect(dropDownUserItem.length).to.equals(2);

    const userItems = users.usersList.items;

    dropDownUserItem.forEach((element, index) => {
      expect(element.props().user.id).to.be.equals(userItems[index].id);
      expect(element.props().user.email).to.be.equals(userItems[index].email);
    });
  });

  it('show and hide dropdown user list', () => {
    wrapper.find('.todo-home__task-item-avatar').simulate('click');
    expect(wrapper.find('.todo__dropdown-content').hasClass('todo__dropdown-content--show')).to.be.equal(true);

    wrapper.find('.todo-home__task-item-avatar').simulate('click');
    expect(wrapper.find('.todo__dropdown-content').hasClass('todo__dropdown-content--show')).to.be.equal(false);
  });
});
