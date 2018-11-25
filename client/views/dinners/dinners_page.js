import Dinners from '../../../imports/api/Dinners';
import DinnerItem from '../../react/components/DinnerItem';

Template.dinnersPage.helpers({
  DinnerItem: () => DinnerItem,
  dinners() {
    const today = moment().startOf('day').toDate().getTime();
    const dinners = Dinners.find({"date": { $gte: today }}, { sort: { "date": 1 } });
    return dinners;
  }
});

Template.dinnersPage.events({
  'click .js-create-dinner'() {
    return Meteor.call('createDinner', function(error, id) {
      if (error) {
        return alert(error.reason);
      }
    });
  }
});
