import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import CreatableSelect from 'react-select/lib/Creatable';

import DietaryRestrictions from '../../../lib/api/DietaryRestrictions';

class GuestDietaryRestrictionsField extends React.Component {
  handleGuestDietaryRestrictionChange = (options, { action }) => {
    console.log(options, action);
    if (action === 'create-option') {
      const label = options.find(o => o.__isNew__).label;
      this.props.createDietaryRestriction({ label });
    } else {
      this.props.onChange(options.map(o => o.value));
    }
  }

  render() {
    const { dietaryRestrictions, guestDietaryRestrictions } = this.props;
    const options = dietaryRestrictions.map(r => ({ ...r, value: r._id }));
    const selectedOptions = guestDietaryRestrictions.map(r => ({ ...r, value: r._id }));

    return (
      <div className="form">
        <div className="form-group">
          <label className="sr-only">Dietary restrictions</label>
          <CreatableSelect
            isMulti
            options={options}
            value={selectedOptions}
            placeholder="Dietary restrictions"
            onChange={this.handleGuestDietaryRestrictionChange}
          />
        </div>
      </div>
    )
  }
}

export default withTracker(({ guestDietaryRestrictionIds, createDietaryRestriction }) => {
  const dietaryRestrictions = DietaryRestrictions.find().fetch();
  const guestDietaryRestrictions = DietaryRestrictions.find({ _id: { $in: guestDietaryRestrictionIds }}).fetch();


  return {
    dietaryRestrictions,
    guestDietaryRestrictions,
    createDietaryRestriction
  }
})(GuestDietaryRestrictionsField);