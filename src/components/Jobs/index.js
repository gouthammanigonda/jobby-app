import {Component} from 'react'
import Cookies from 'js-cookie'
import {RiSearchLine} from 'react-icons/ri'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {GiSuitcase} from 'react-icons/gi'
import Header from '../Header'
import './index.css'
import {descriptions} from 'jest-config'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
    searchIp: '',
    isSearchIconClicked: false,
    profileDetails: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
      })
    }
  }

  getJobs = async () => {
    const {salaryRange, employmentType, searchIp} = this.state
    const token = Cookies.get('jwt_token')
    const editedEmploymentType = employmentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${editedEmploymentType}&minimum_package=${salaryRange}&search=${searchIp}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response.ok)

    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsList: updatedData,
      })
    }
  }

  onUpdateEmployeeType = (isChecked, id) => {
    const {employmentType} = this.state
    if (isChecked) {
      this.setState(
        {
          employmentType: [...employmentType, id],
        },
        this.getJobs,
      )
    } else {
      const updatedEmployeType = employmentType.filter(each => each !== id)
      this.setState(
        {
          employmentType: [...updatedEmployeType],
        },
        this.getJobs,
      )
    }
  }

  updateSalaryRange = (isChecked, id) => {
    if (isChecked) {
      this.setState({salaryRange: id}, this.getJobs)
    }
  }

  renderTypeOfEmployment = () => {
    const a = 0
    return (
      <div className="filter-container">
        <h1 className="filter-heading">Type of Employment</h1>
        {employmentTypesList.map(each => {
          const onChangeCheckbox = event => {
            const isChecked = event.target.checked
            this.onUpdateEmployeeType(isChecked, each.employmentTypeId)
          }

          return (
            <div className="input-filter-container" key={each.employmentTypeId}>
              <input
                type="checkbox"
                id={each.employmentTypeId}
                className="checkbox"
                onChange={onChangeCheckbox}
              />
              <label htmlFor={each.employmentTypeId} className="filter-text">
                {each.label}
              </label>
            </div>
          )
        })}
      </div>
    )
  }

  renderSalaryRange = () => {
    const a = 0
    return (
      <div className="filter-container">
        <h1 className="filter-heading">Salary Range</h1>
        {salaryRangesList.map(each => {
          const onChangeRadiobtn = event => {
            const isChecked = event.target.checked
            this.updateSalaryRange(isChecked, each.salaryRangeId)
          }
          return (
            <div className="input-filter-container" key={each.salaryRangeId}>
              <input
                type="radio"
                id={each.salaryRangeId}
                name="salaryrange"
                value={each.salaryRangeId}
                className="radio"
                onChange={onChangeRadiobtn}
              />
              <label htmlFor={each.salaryRangeId} className="filter-text">
                {each.label}
              </label>
            </div>
          )
        })}
      </div>
    )
  }

  onClickSearchIcon = () => {
    this.setState(
      prevState => ({
        isSearchIconClicked: !prevState.isSearchIconClicked,
      }),
      this.getJobs,
    )
  }

  onChangeSearchInput = event => {
    this.setState({
      searchIp: event.target.value,
    })
  }

  renderJobs = () => {
    const {jobsList} = this.state
    return (
      <div className="filter-results-container">
        {jobsList.map(each => {
          const {
            companyLogoUrl,
            employmentType,
            id,
            jobDescription,
            location,
            packagePerAnnum,
            rating,
            title,
          } = each
          return (
            <div key={id} className="each-filtered-result">
              <div className="header-content">
                <div className="header1">
                  <div>
                    <img
                      src={companyLogoUrl}
                      alt={title}
                      className="company-img"
                    />
                  </div>
                  <div className="title-rating-container">
                    <h1 className="title">{title}</h1>
                    <div className="iconstar-rating-container">
                      <AiFillStar className="star" />
                      <p className="rating">{rating}</p>
                    </div>
                  </div>
                </div>
                <div className="header2">
                  <div className="location-employmentType-container">
                    <div className="location-container">
                      <MdLocationOn className="header2-icon" />
                      <p className="header2-text">{location}</p>
                    </div>
                    <div className="location-container">
                      <GiSuitcase className="header2-icon" />
                      <p className="header2-text">{employmentType}</p>
                    </div>
                  </div>
                  <p className="package">{packagePerAnnum}</p>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="description-container">
                <h1 className="description">Description</h1>
                <p className="description-para">{jobDescription}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const {employmentType, salaryRange, searchIp, profileDetails} = this.state
    console.log(employmentType.join(','))
    console.log(salaryRange)
    console.log(searchIp)

    return (
      <div className="bg-container">
        <Header />
        <div className="jobs">
          <div className="jobs-container">
            <div className="section1">
              <div className="profile-container">
                <img
                  src={profileDetails.profileImageUrl}
                  alt="logo"
                  className="profile-logo"
                />
                <h1 className="profile-heading">{profileDetails.name}</h1>
                <p className="profile-description">{profileDetails.shortBio}</p>
              </div>
              <hr className="hr-line" />
              {this.renderTypeOfEmployment()}
              <hr className="hr-line" />
              {this.renderSalaryRange()}
            </div>
            <div className="section2">
              <div className="sub-container-section2">
                <div className="filter-search-container">
                  <input
                    type="search"
                    placeholder="search"
                    id="search-filter"
                    className="search-filter"
                    onChange={this.onChangeSearchInput}
                  />
                  <label
                    htmlFor="search-filter"
                    className="search-label"
                    onClick={this.onClickSearchIcon}
                  >
                    <RiSearchLine size={25} className="search-icon" />
                  </label>
                </div>
                {this.renderJobs()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
