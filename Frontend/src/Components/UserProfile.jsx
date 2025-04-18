import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast, Toaster } from "react-hot-toast"
import { SKILLS_LIST, UNIVERSITIES_LIST, DEGREE_TYPES, generateYearsList, JOB_TITLES } from "./constants"
import { jwtDecode } from "jwt-decode" // Import jwt-decode
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  // State for profile data
  const [profileData, setProfileData] = useState({
    name: "",
    designation: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    description: "",
    skills: [],
    education: [],
    projects: [],
    experience: [],
    certifications: [],
    hobbies: [],
    imageSrc: "",
  })

  // UI state
  const [isEditing, setIsEditing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState(null)

  // Available skills (filtered based on already selected skills)
  const [availableSkills, setAvailableSkills] = useState(SKILLS_LIST)
  const [availableYears, setAvailableYears] = useState(generateYearsList())

  // Form states
  const [newSkill, setNewSkill] = useState("")
  const [designation, setDesignation] = useState("")
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [searchSkill, setSearchSkill] = useState("")
  const [showSkillDropdown, setShowSkillDropdown] = useState(false)

  // Education form state
  const [isAddingEducation, setIsAddingEducation] = useState(false)
  const [editingEducationId, setEditingEducationId] = useState(null)
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    fromYear: "",
    toYear: "",
    cgpa: "",
    isPercentage: false,
  })
  const [searchUniversity, setSearchUniversity] = useState("")
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false)
  const [filteredUniversities, setFilteredUniversities] = useState(UNIVERSITIES_LIST)
  const [showDegreeDropdown, setShowDegreeDropdown] = useState(false)
  const [showFromYearDropdown, setShowFromYearDropdown] = useState(false)
  const [showToYearDropdown, setShowToYearDropdown] = useState(false)
  const [availableToYears, setAvailableToYears] = useState(availableYears)

  // Project form state
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState(null)
  const [newProject, setNewProject] = useState({
    name: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  // Experience form state
  const [isAddingExperience, setIsAddingExperience] = useState(false)
  const [editingExperienceId, setEditingExperienceId] = useState(null)
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    companyType: "",
    fromYear: "",
    toYear: "",
    description: "",
  })
  const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false)
  const [searchJobTitle, setSearchJobTitle] = useState("")
  const [filteredJobTitles, setFilteredJobTitles] = useState(JOB_TITLES)
  const [showCompanyTypeDropdown, setShowCompanyTypeDropdown] = useState(false)
  const [showExpFromYearDropdown, setShowExpFromYearDropdown] = useState(false)
  const [showExpToYearDropdown, setShowExpToYearDropdown] = useState(false)
  const [availableExpToYears, setAvailableExpToYears] = useState(availableYears)

  // Certification form state
  const [isAddingCertification, setIsAddingCertification] = useState(false)
  const [editingCertificationId, setEditingCertificationId] = useState(null)
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    expiryDate: "",
    credentialId: "",
  })

  // Hobby form state
  const [isAddingHobby, setIsAddingHobby] = useState(false)
  const [editingHobby, setEditingHobby] = useState(null)
  const [newHobby, setNewHobby] = useState("")

  // Get user ID from auth token
  useEffect(() => {
    const getUserIdFromToken = () => {
      const token = localStorage.getItem("authToken")
      if (token) {
        try {
          const decoded = jwtDecode(token)
          console.log("✅ Decoded Token:", decoded)
          const id = decoded?.user?.id
          if (id) {
            console.log("✅ Extracted User ID:", id)
            setUserId(id)
          } else {
            console.log("❌ ID not found in token")
          }
        } catch (error) {
          console.error("❌ Error decoding token:", error)
        }
      } else {
        console.log("❌ No token found in localStorage")
      }
    }

    getUserIdFromToken()
  }, [])

  useEffect(() => {
    if (userId === null) return // Wait until userId is actually decoded

    // Only fetch if we have a valid userId
    if (userId) {
      fetchUserProfile(userId)
    } else {
      setIsLoading(false)
      toast.error("Profile not found. Working in offline mode.")
    }
  }, [userId])

  // Fetch user profile data
  const fetchUserProfile = async (id) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`http://localhost:3001/api/profile/user/${id}`)

      if (response.data.success && response.data.profile) {
        setProfileData(response.data.profile)
        toast.success("Profile loaded successfully")
      } else {
        // If no profile exists, we'll keep the default empty state
        // toast.info("No profile found. Create a new one.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast.error("Failed to load profile")
    } finally {
      setIsLoading(false)
    }
  }

  // Update available skills when profileData.skills changes
  useEffect(() => {
    setAvailableSkills(SKILLS_LIST.filter((skill) => !profileData.skills.includes(skill)))
  }, [profileData.skills])

  // Filter universities based on search
  useEffect(() => {
    if (searchUniversity) {
      setFilteredUniversities(
        UNIVERSITIES_LIST.filter((uni) => uni.toLowerCase().includes(searchUniversity.toLowerCase())),
      )
    } else {
      setFilteredUniversities(UNIVERSITIES_LIST)
    }
  }, [searchUniversity])

  // Update available "to years" based on selected "from year"
  useEffect(() => {
    if (newEducation.fromYear) {
      const fromYearInt = Number.parseInt(newEducation.fromYear)
      setAvailableToYears(availableYears.filter((year) => Number.parseInt(year) >= fromYearInt))
    } else {
      setAvailableToYears(availableYears)
    }
  }, [newEducation.fromYear, availableYears])

  // Filter job titles based on search
  useEffect(() => {
    if (searchJobTitle) {
      setFilteredJobTitles(JOB_TITLES.filter((title) => title.toLowerCase().includes(searchJobTitle.toLowerCase())))
    } else {
      setFilteredJobTitles(JOB_TITLES)
    }
  }, [searchJobTitle])

  // Update available experience "to years" based on selected "from year"
  useEffect(() => {
    if (newExperience.fromYear) {
      const fromYearInt = Number.parseInt(newExperience.fromYear)
      setAvailableExpToYears(availableYears.filter((year) => Number.parseInt(year) >= fromYearInt))
    } else {
      setAvailableExpToYears(availableYears)
    }
  }, [newExperience.fromYear, availableYears])

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  // Save profile data
  const handleSave = async () => {
    try {
      // Only upload if the image is not the placeholder and starts with data:image
      if (profileData.imageSrc.startsWith("data:image")) {
        const imageUrl = await uploadToCloudinary(profileData.imageSrc)
        setProfileData({
          ...profileData,
          imageSrc: imageUrl,
        })
      }

      if (userId) {
        // Check if profile exists
        const checkResponse = await axios.get(`http://localhost:3001/api/profile/user/${userId}`)

        if (checkResponse.data.success && checkResponse.data.profile) {
          // Update existing profile
          const updateResponse = await axios.put(`http://localhost:3001/api/profile/update/${userId}`, {
            ...profileData,
            userId,
          })

          if (updateResponse.data.success) {
            toast.success("Profile updated successfully")
          } else {
            toast.error("Failed to update profile")
          }
        } else {
          // Create new profile
          const createResponse = await axios.post("http://localhost:3001/api/profile/create", {
            ...profileData,
            userId,
          })

          if (createResponse.data.success) {
            toast.success("Profile created successfully")
          } else {
            toast.error("Failed to create profile")
          }
        }
      } else {
        // Offline mode - just show a message
        toast.success("Profile saved locally (offline mode)")
      }

      setIsEditing(false)
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error("Failed to save profile")
    }
  }

  // Handle input changes for basic profile fields
  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    })
  }

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileData({
          ...profileData,
          imageSrc: event.target?.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle drag and drop for image
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileData({
          ...profileData,
          imageSrc: event.target?.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Upload image to Cloudinary
  const uploadToCloudinary = async (base64Image) => {
    try {
      const base64Data = base64Image.split(",")[1]

      const formData = new FormData()
      formData.append("file", `data:image/jpeg;base64,${base64Data}`)
      formData.append("upload_preset", "iampreety")

      const response = await fetch("https://api.cloudinary.com/v1_1/dinlgwks4/image/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.secure_url) {
        console.log("✅ Image uploaded:", data.secure_url)

        // Update profile image in the database if userId exists
        if (userId) {
          await axios.put(`http://localhost:3001/api/profile/image/update/${userId}`, {
            imageSrc: data.secure_url,
          })
        }

        return data.secure_url
      } else {
        throw new Error("❌ Upload failed: " + JSON.stringify(data))
      }
    } catch (error) {
      console.error("🚨 Error uploading to Cloudinary:", error)
      toast.error("Failed to upload image")
      return profileData.imageSrc // fallback to current image
    }
  }

  // Skills handlers
  const handleAddSkill = () => {
    setIsAddingSkill(true)
    setShowSkillDropdown(true)
  }

  const handleSkillInputChange = (e) => {
    setSearchSkill(e.target.value)
    setShowSkillDropdown(true)
  }

  const handleSelectSkill = async (skill) => {
    try {
      if (userId) {
        const response = await axios.post(`http://localhost:3001/api/profile/skill/add/${userId}`, { skill })

        if (response.data.success) {
          setProfileData({
            ...profileData,
            skills: [...profileData.skills, skill],
          })
          toast.success("Skill added successfully")
        } else {
          toast.error("Failed to add skill")
        }
      } else {
        // Offline mode
        setProfileData({
          ...profileData,
          skills: [...profileData.skills, skill],
        })
      }

      setSearchSkill("")
      setShowSkillDropdown(false)
      setIsAddingSkill(false)
    } catch (error) {
      console.error("Error adding skill:", error)
      toast.error("Failed to add skill")

      // Still update local state even if API call fails
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skill],
      })
      setSearchSkill("")
      setShowSkillDropdown(false)
      setIsAddingSkill(false)
    }
  }

  const handleRemoveSkill = async (skillToRemove) => {
    try {
      if (userId) {
        const response = await axios.delete(`http://localhost:3001/api/profile/skill/delete/${userId}/${skillToRemove}`)

        if (response.data.success) {
          setProfileData({
            ...profileData,
            skills: profileData.skills.filter((skill) => skill !== skillToRemove),
          })
          toast.success("Skill removed successfully")
        } else {
          toast.error("Failed to remove skill")
        }
      } else {
        // Offline mode
        setProfileData({
          ...profileData,
          skills: profileData.skills.filter((skill) => skill !== skillToRemove),
        })
      }
    } catch (error) {
      console.error("Error removing skill:", error)
      toast.error("Failed to remove skill")

      // Still update local state even if API call fails
      setProfileData({
        ...profileData,
        skills: profileData.skills.filter((skill) => skill !== skillToRemove),
      })
    }
  }

  // Education handlers
  const handleAddEducation = () => {
    setEditingEducationId(null)
    setNewEducation({
      degree: "",
      institution: "",
      fromYear: "",
      toYear: "",
      cgpa: "",
      isPercentage: false,
    })
    setIsAddingEducation(true)
  }

  const handleEditEducation = (edu) => {
    setIsAddingEducation(true)
    setEditingEducationId(edu._id)
    setNewEducation({
      degree: edu.degree,
      institution: edu.institution,
      fromYear: edu.fromYear,
      toYear: edu.toYear === "Present" ? "" : edu.toYear,
      cgpa: edu.cgpa,
      isPercentage: edu.isPercentage,
    })
  }

  const handleEducationInputChange = (field, value) => {
    setNewEducation({
      ...newEducation,
      [field]: value,
    })
  }

  const handleTogglePercentage = () => {
    setNewEducation({
      ...newEducation,
      isPercentage: !newEducation.isPercentage,
    })
  }

  const handleSelectUniversity = (university) => {
    setNewEducation({
      ...newEducation,
      institution: university,
    })
    setSearchUniversity("")
    setShowUniversityDropdown(false)
  }

  const handleSelectDegree = (degree) => {
    setNewEducation({
      ...newEducation,
      degree,
    })
    setShowDegreeDropdown(false)
  }

  const handleSelectFromYear = (year) => {
    setNewEducation({
      ...newEducation,
      fromYear: year,
      // Reset toYear if it's now invalid
      toYear: Number.parseInt(newEducation.toYear) < Number.parseInt(year) ? "" : newEducation.toYear,
    })
    setShowFromYearDropdown(false)
  }

  const handleSelectToYear = (year) => {
    setNewEducation({
      ...newEducation,
      toYear: year,
    })
    setShowToYearDropdown(false)
  }

  const handleEducationSubmit = async () => {
    if (newEducation.degree && newEducation.institution) {
      try {
        const educationData = {
          degree: newEducation.degree,
          institution: newEducation.institution,
          fromYear: newEducation.fromYear,
          toYear: newEducation.toYear || "Present",
          cgpa: newEducation.cgpa,
          isPercentage: newEducation.isPercentage,
        }

        if (editingEducationId) {
          // Update existing education
          if (userId) {
            const response = await axios.put(
              `http://localhost:3001/api/profile/education/update/${userId}/${editingEducationId}`,
              educationData,
            )

            if (response.data.success) {
              setProfileData({
                ...profileData,
                education: profileData.education.map((edu) =>
                  edu._id.toString() === editingEducationId ? { ...educationData, _id: edu._id } : edu,
                ),
              })
              toast.success("Education updated successfully")
            } else {
              toast.error("Failed to update education")
            }
          } else {
            // Offline mode
            setProfileData({
              ...profileData,
              education: profileData.education.map((edu) =>
                edu._id.toString() === editingEducationId ? { ...educationData, _id: edu._id } : edu,
              ),
            })
          }
        } else {
          // Add new education
          if (userId) {
            const response = await axios.post(
              `http://localhost:3001/api/profile/education/add/${userId}`,
              educationData,
            )

            if (response.data.success) {
              setProfileData({
                ...profileData,
                education: [
                  ...profileData.education,
                  response.data.profile.education[response.data.profile.education.length - 1],
                ],
              })
              toast.success("Education added successfully")
            } else {
              toast.error("Failed to add education")
            }
          } else {
            // Offline mode - add with a fake ID
            const fakeId = Date.now().toString()
            const educationEntry = {
              ...educationData,
              _id: fakeId,
            }

            setProfileData({
              ...profileData,
              education: [...profileData.education, educationEntry],
            })
          }
        }

        // Reset form
        setNewEducation({
          degree: "",
          institution: "",
          fromYear: "",
          toYear: "",
          cgpa: "",
          isPercentage: false,
        })
        setIsAddingEducation(false)
        setEditingEducationId(null)
      } catch (error) {
        console.error("Error handling education:", error)
        toast.error(editingEducationId ? "Failed to update education" : "Failed to add education")

        // Still update local state even if API call fails
        if (editingEducationId) {
          setProfileData({
            ...profileData,
            education: profileData.education.map((edu) =>
              edu._id.toString() === editingEducationId
                ? { ...newEducation, toYear: newEducation.toYear || "Present", _id: edu._id }
                : edu,
            ),
          })
        } else {
          const fakeId = Date.now().toString()
          const educationEntry = {
            degree: newEducation.degree,
            institution: newEducation.institution,
            fromYear: newEducation.fromYear,
            toYear: newEducation.toYear || "Present",
            cgpa: newEducation.cgpa,
            isPercentage: newEducation.isPercentage,
            _id: fakeId,
          }

          setProfileData({
            ...profileData,
            education: [...profileData.education, educationEntry],
          })
        }

        // Reset form
        setNewEducation({
          degree: "",
          institution: "",
          fromYear: "",
          toYear: "",
          cgpa: "",
          isPercentage: false,
        })
        setIsAddingEducation(false)
        setEditingEducationId(null)
      }
    }
  }

  const handleRemoveEducation = async (eduId) => {
    try {
      if (userId) {
        const response = await axios.delete(`http://localhost:3001/api/profile/education/delete/${userId}/${eduId}`)

        if (response.data.success) {
          setProfileData({
            ...profileData,
            education: profileData.education.filter((edu) => edu._id.toString() !== eduId),
          })
          toast.success("Education removed successfully")
        } else {
          toast.error("Failed to remove education")
        }
      } else {
        // Offline mode
        setProfileData({
          ...profileData,
          education: profileData.education.filter((edu) => edu._id.toString() !== eduId),
        })
      }
    } catch (error) {
      console.error("Error removing education:", error)
      toast.error("Failed to remove education")

      // Still update local state even if API call fails
      setProfileData({
        ...profileData,
        education: profileData.education.filter((edu) => edu._id.toString() !== eduId),
      })
    }
  }

  // Project handlers
  const handleAddProject = () => {
    setEditingProjectId(null)
    setNewProject({
      name: "",
      companyName: "",
      startDate: "",
      endDate: "",
      description: "",
    })
    setIsAddingProject(true)
  }

  const handleEditProject = (project) => {
    setIsAddingProject(true)
    setEditingProjectId(project._id)
    setNewProject({
      name: project.name,
      companyName: project.companyName || "",
      startDate: project.startDate || "",
      endDate: project.endDate === "Present" ? "" : project.endDate || "",
      description: project.description || "",
    })
  }

  const handleProjectInputChange = (field, value) => {
    setNewProject({
      ...newProject,
      [field]: value,
    })
  }

  const handleProjectSubmit = async () => {
    if (newProject.name) {
      try {
        const projectData = {
          name: newProject.name,
          companyName: newProject.companyName,
          startDate: newProject.startDate,
          endDate: newProject.endDate || "Present",
          description: newProject.description,
        }

        if (editingProjectId) {
          // Update existing project
          if (userId) {
            const response = await axios.put(
              `http://localhost:3001/api/profile/project/update/${userId}/${editingProjectId}`,
              projectData,
            )

            if (response.data.success) {
              setProfileData({
                ...profileData,
                projects: profileData.projects.map((project) =>
                  project._id.toString() === editingProjectId ? { ...projectData, _id: project._id } : project,
                ),
              })
              toast.success("Project updated successfully")
            } else {
              toast.error("Failed to update project")
            }
          } else {
            // Offline mode
            setProfileData({
              ...profileData,
              projects: profileData.projects.map((project) =>
                project._id.toString() === editingProjectId ? { ...projectData, _id: project._id } : project,
              ),
            })
          }
        } else {
          // Add new project
          if (userId) {
            const response = await axios.post(`http://localhost:3001/api/profile/project/add/${userId}`, projectData)

            if (response.data.success) {
              setProfileData({
                ...profileData,
                projects: [
                  ...profileData.projects,
                  response.data.profile.projects[response.data.profile.projects.length - 1],
                ],
              })
              toast.success("Project added successfully")
            } else {
              toast.error("Failed to add project")
            }
          } else {
            // Offline mode - add with a fake ID
            const fakeId = Date.now().toString()
            const projectEntry = {
              ...projectData,
              _id: fakeId,
            }

            setProfileData({
              ...profileData,
              projects: [...profileData.projects, projectEntry],
            })
          }
        }

        // Reset form
        setNewProject({
          name: "",
          companyName: "",
          startDate: "",
          endDate: "",
          description: "",
        })
        setIsAddingProject(false)
        setEditingProjectId(null)
      } catch (error) {
        console.error("Error handling project:", error)
        toast.error(editingProjectId ? "Failed to update project" : "Failed to add project")

        // Still update local state even if API call fails
        if (editingProjectId) {
          setProfileData({
            ...profileData,
            projects: profileData.projects.map((project) =>
              project._id.toString() === editingProjectId
                ? { ...newProject, endDate: newProject.endDate || "Present", _id: project._id }
                : project,
            ),
          })
        } else {
          const fakeId = Date.now().toString()
          const projectEntry = {
            name: newProject.name,
            companyName: newProject.companyName,
            startDate: newProject.startDate,
            endDate: newProject.endDate || "Present",
            description: newProject.description,
            _id: fakeId,
          }

          setProfileData({
            ...profileData,
            projects: [...profileData.projects, projectEntry],
          })
        }

        // Reset form
        setNewProject({
          name: "",
          companyName: "",
          startDate: "",
          endDate: "",
          description: "",
        })
        setIsAddingProject(false)
        setEditingProjectId(null)
      }
    }
  }

  const handleRemoveProject = async (projectId) => {
    try {
      if (userId) {
        const response = await axios.delete(`http://localhost:3001/api/profile/project/delete/${userId}/${projectId}`)

        if (response.data.success) {
          setProfileData({
            ...profileData,
            projects: profileData.projects.filter((project) => project._id.toString() !== projectId),
          })
          toast.success("Project removed successfully")
        } else {
          toast.error("Failed to remove project")
        }
      } else {
        // Offline mode
        setProfileData({
          ...profileData,
          projects: profileData.projects.filter((project) => project._id.toString() !== projectId),
        })
      }
    } catch (error) {
      console.error("Error removing project:", error)
      toast.error("Failed to remove project")

      // Still update local state even if API call fails
      setProfileData({
        ...profileData,
        projects: profileData.projects.filter((project) => project._id.toString() !== projectId),
      })
    }
  }

  // Experience handlers
  const handleAddExperience = () => {
    setEditingExperienceId(null)
    setNewExperience({
      title: "",
      company: "",
      companyType: "",
      fromYear: "",
      toYear: "",
      description: "",
    })
    setIsAddingExperience(true)
  }

  const handleEditExperience = (exp) => {
    setIsAddingExperience(true)
    setEditingExperienceId(exp._id)
    setNewExperience({
      title: exp.title,
      company: exp.company,
      companyType: exp.companyType || "",
      fromYear: exp.fromYear,
      toYear: exp.toYear === "Present" ? "" : exp.toYear,
      description: exp.description || "",
    })
  }

  const handleExperienceInputChange = (field, value) => {
    setNewExperience({
      ...newExperience,
      [field]: value,
    })
  }

  const handleSelectJobTitle = (title) => {
    setNewExperience({
      ...newExperience,
      title,
    })
    setSearchJobTitle("")
    setShowJobTitleDropdown(false)
  }

  const handleSelectCompanyType = (type) => {
    setNewExperience({
      ...newExperience,
      companyType: type,
    })
    setShowCompanyTypeDropdown(false)
  }

  const handleSelectExpFromYear = (year) => {
    setNewExperience({
      ...newExperience,
      fromYear: year,
      // Reset toYear if it's now invalid
      toYear: Number.parseInt(newExperience.toYear) < Number.parseInt(year) ? "" : newExperience.toYear,
    })
    setShowExpFromYearDropdown(false)
  }

  const handleSelectExpToYear = (year) => {
    setNewExperience({
      ...newExperience,
      toYear: year,
    })
    setShowExpToYearDropdown(false)
  }

  const handleExperienceSubmit = async () => {
    if (newExperience.title && newExperience.company) {
      try {
        const experienceData = {
          title: newExperience.title,
          company: newExperience.company,
          companyType: newExperience.companyType,
          fromYear: newExperience.fromYear,
          toYear: newExperience.toYear || "Present",
          description: newExperience.description,
        }

        if (editingExperienceId) {
          // Update existing experience
          if (userId) {
            const response = await axios.put(
              `http://localhost:3001/api/profile/experience/update/${userId}/${editingExperienceId}`,
              experienceData,
            )

            if (response.data.success) {
              setProfileData({
                ...profileData,
                experience: profileData.experience.map((exp) =>
                  exp._id.toString() === editingExperienceId ? { ...experienceData, _id: exp._id } : exp,
                ),
              })
              toast.success("Experience updated successfully")
            } else {
              toast.error("Failed to update experience")
            }
          } else {
            // Offline mode
            setProfileData({
              ...profileData,
              experience: profileData.experience.map((exp) =>
                exp._id.toString() === editingExperienceId ? { ...experienceData, _id: exp._id } : exp,
              ),
            })
          }
        } else {
          // Add new experience
          if (userId) {
            const response = await axios.post(
              `http://localhost:3001/api/profile/experience/add/${userId}`,
              experienceData,
            )

            if (response.data.success) {
              setProfileData({
                ...profileData,
                experience: [
                  ...profileData.experience,
                  response.data.profile.experience[response.data.profile.experience.length - 1],
                ],
              })
              toast.success("Experience added successfully")
            } else {
              toast.error("Failed to add experience")
            }
          } else {
            // Offline mode - add with a fake ID
            const fakeId = Date.now().toString()
            const experienceEntry = {
              ...experienceData,
              _id: fakeId,
            }

            setProfileData({
              ...profileData,
              experience: [...profileData.experience, experienceEntry],
            })
          }
        }

        // Reset form
        setNewExperience({
          title: "",
          company: "",
          companyType: "",
          fromYear: "",
          toYear: "",
          description: "",
        })
        setIsAddingExperience(false)
        setEditingExperienceId(null)
      } catch (error) {
        console.error("Error handling experience:", error)
        toast.error(editingExperienceId ? "Failed to update experience" : "Failed to add experience")

        // Still update local state even if API call fails
        if (editingExperienceId) {
          setProfileData({
            ...profileData,
            experience: profileData.experience.map((exp) =>
              exp._id.toString() === editingExperienceId
                ? { ...newExperience, toYear: newExperience.toYear || "Present", _id: exp._id }
                : exp,
            ),
          })
        } else {
          const fakeId = Date.now().toString()
          const experienceEntry = {
            title: newExperience.title,
            company: newExperience.company,
            companyType: newExperience.companyType,
            fromYear: newExperience.fromYear,
            toYear: newExperience.toYear || "Present",
            description: newExperience.description,
            _id: fakeId,
          }

          setProfileData({
            ...profileData,
            experience: [...profileData.experience, experienceEntry],
          })
        }

        // Reset form
        setNewExperience({
          title: "",
          company: "",
          companyType: "",
          fromYear: "",
          toYear: "",
          description: "",
        })
        setIsAddingExperience(false)
        setEditingExperienceId(null)
      }
    }
  }

  const handleRemoveExperience = async (expId) => {
    try {
      if (userId) {
        const response = await axios.delete(`http://localhost:3001/api/profile/experience/delete/${userId}/${expId}`)

        if (response.data.success) {
          setProfileData({
            ...profileData,
            experience: profileData.experience.filter((exp) => exp._id.toString() !== expId),
          })
          toast.success("Experience removed successfully")
        } else {
          toast.error("Failed to remove experience")
        }
      } else {
        // Offline mode
        setProfileData({
          ...profileData,
          experience: profileData.experience.filter((exp) => exp._id.toString() !== expId),
        })
      }
    } catch (error) {
      console.error("Error removing experience:", error)
      toast.error("Failed to remove experience")

      // Still update local state even if API call fails
      setProfileData({
        ...profileData,
        experience: profileData.experience.filter((exp) => exp._id.toString() !== expId),
      })
    }
  }

  // Certification handlers
  const handleAddCertification = () => {
    setEditingCertificationId(null)
    setNewCertification({
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
    })
    setIsAddingCertification(true)
  }

  const handleEditCertification = (cert) => {
    setIsAddingCertification(true)
    setEditingCertificationId(cert._id)
    setNewCertification({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date || "",
      expiryDate: cert.expiryDate || "",
      credentialId: cert.credentialId || "",
    })
  }

  const handleCertificationInputChange = (field, value) => {
    setNewCertification({
      ...newCertification,
      [field]: value,
    })
  }

  const handleCertificationSubmit = async () => {
    if (newCertification.name && newCertification.issuer) {
      try {
        const certificationData = {
          name: newCertification.name,
          issuer: newCertification.issuer,
          date: newCertification.date,
          expiryDate: newCertification.expiryDate,
          credentialId: newCertification.credentialId,
        }

        if (editingCertificationId) {
          // Update existing certification
          if (userId) {
            const response = await axios.put(
              `http://localhost:3001/api/profile/certification/update/${userId}/${editingCertificationId}`,
              certificationData,
            )

            if (response.data.success) {
              setProfileData({
                ...profileData,
                certifications: profileData.certifications.map((cert) =>
                  cert._id.toString() === editingCertificationId ? { ...certificationData, _id: cert._id } : cert,
                ),
              })
              toast.success("Certification updated successfully")
            } else {
              toast.error("Failed to update certification")
            }
          } else {
            // Offline mode
            setProfileData({
              ...profileData,
              certifications: profileData.certifications.map((cert) =>
                cert._id.toString() === editingCertificationId ? { ...certificationData, _id: cert._id } : cert,
              ),
            })
          }
        } else {
          // Add new certification
          if (userId) {
            const response = await axios.post(
              `http://localhost:3001/api/profile/certification/add/${userId}`,
              certificationData,
            )

            if (response.data.success) {
              setProfileData({
                ...profileData,
                certifications: [
                  ...profileData.certifications,
                  response.data.profile.certifications[response.data.profile.certifications.length - 1],
                ],
              })
              toast.success("Certification added successfully")
            } else {
              toast.error("Failed to add certification")
            }
          } else {
            // Offline mode - add with a fake ID
            const fakeId = Date.now().toString()
            const certificationEntry = {
              ...certificationData,
              _id: fakeId,
            }

            setProfileData({
              ...profileData,
              certifications: [...profileData.certifications, certificationEntry],
            })
          }
        }

        // Reset form
        setNewCertification({
          name: "",
          issuer: "",
          date: "",
          expiryDate: "",
          credentialId: "",
        })
        setIsAddingCertification(false)
        setEditingCertificationId(null)
      } catch (error) {
        console.error("Error handling certification:", error)
        toast.error(editingCertificationId ? "Failed to update certification" : "Failed to add certification")

        // Still update local state even if API call fails
        if (editingCertificationId) {
          setProfileData({
            ...profileData,
            certifications: profileData.certifications.map((cert) =>
              cert._id.toString() === editingCertificationId ? { ...newCertification, _id: cert._id } : cert,
            ),
          })
        } else {
          const fakeId = Date.now().toString()
          const certificationEntry = {
            name: newCertification.name,
            issuer: newCertification.issuer,
            date: newCertification.date,
            expiryDate: newCertification.expiryDate,
            credentialId: newCertification.credentialId,
            _id: fakeId,
          }

          setProfileData({
            ...profileData,
            certifications: [...profileData.certifications, certificationEntry],
          })
        }

        // Reset form
        setNewCertification({
          name: "",
          issuer: "",
          date: "",
          expiryDate: "",
          credentialId: "",
        })
        setIsAddingCertification(false)
        setEditingCertificationId(null)
      }
    }
  }

  const handleRemoveCertification = async (certId) => {
    try {
      if (userId) {
        const response = await axios.delete(
          `http://localhost:3001/api/profile/certification/delete/${userId}/${certId}`,
        )

        if (response.data.success) {
          setProfileData({
            ...profileData,
            certifications: profileData.certifications.filter((cert) => cert._id.toString() !== certId),
          })
          toast.success("Certification removed successfully")
        } else {
          toast.error("Failed to remove certification")
        }
      } else {
        // Offline mode
        setProfileData({
          ...profileData,
          certifications: profileData.certifications.filter((cert) => cert._id.toString() !== certId),
        })
      }
    } catch (error) {
      console.error("Error removing certification:", error)
      toast.error("Failed to remove certification")

      // Still update local state even if API call fails
      setProfileData({
        ...profileData,
        certifications: profileData.certifications.filter((cert) => cert._id.toString() !== certId),
      })
    }
  }

  // Hobby handlers
  const handleAddHobby = () => {
    setEditingHobby(null)
    setNewHobby("")
    setIsAddingHobby(true)
  }

  const handleEditHobby = (hobby) => {
    setIsAddingHobby(true)
    setEditingHobby(hobby)
    setNewHobby(hobby)
  }

  const handleHobbyInputChange = (e) => {
    setNewHobby(e.target.value)
  }

  const handleHobbySubmit = async () => {
    if (newHobby.trim()) {
      try {
        if (editingHobby) {
          // Update existing hobby
          if (userId) {
            const response = await axios.put(`http://localhost:3001/api/profile/hobby/update/${userId}`, {
              oldHobby: editingHobby,
              newHobby: newHobby.trim(),
            })

            if (response.data.success) {
              setProfileData({
                ...profileData,
                hobbies: profileData.hobbies.map((hobby) => (hobby === editingHobby ? newHobby.trim() : hobby)),
              })
              toast.success("Hobby updated successfully")
            } else {
              toast.error("Failed to update hobby")
            }
          } else {
            // Offline mode
            setProfileData({
              ...profileData,
              hobbies: profileData.hobbies.map((hobby) => (hobby === editingHobby ? newHobby.trim() : hobby)),
            })
          }
        } else {
          // Add new hobby
          if (userId) {
            const response = await axios.post(`http://localhost:3001/api/profile/hobby/add/${userId}`, {
              hobby: newHobby.trim(),
            })

            if (response.data.success) {
              setProfileData({
                ...profileData,
                hobbies: [...profileData.hobbies, newHobby.trim()],
              })
              toast.success("Hobby added successfully")
            } else {
              toast.error("Failed to add hobby")
            }
          } else {
            // Offline mode
            setProfileData({
              ...profileData,
              hobbies: [...profileData.hobbies, newHobby.trim()],
            })
          }
        }

        setNewHobby("")
        setIsAddingHobby(false)
        setEditingHobby(null)
      } catch (error) {
        console.error("Error handling hobby:", error)
        toast.error(editingHobby ? "Failed to update hobby" : "Failed to add hobby")

        // Still update local state even if API call fails
        if (editingHobby) {
          setProfileData({
            ...profileData,
            hobbies: profileData.hobbies.map((hobby) => (hobby === editingHobby ? newHobby.trim() : hobby)),
          })
        } else {
          setProfileData({
            ...profileData,
            hobbies: [...profileData.hobbies, newHobby.trim()],
          })
        }

        setNewHobby("")
        setIsAddingHobby(false)
        setEditingHobby(null)
      }
    }
  }

  const handleRemoveHobby = async (hobbyToRemove) => {
    try {
      if (userId) {
        const response = await axios.delete(`http://localhost:3001/api/profile/hobby/delete/${userId}/${hobbyToRemove}`)

        if (response.data.success) {
          setProfileData({
            ...profileData,
            hobbies: profileData.hobbies.filter((hobby) => hobby !== hobbyToRemove),
          })
          toast.success("Hobby removed successfully")
        } else {
          toast.error("Failed to remove hobby")
        }
      } else {
        // Offline mode
        setProfileData({
          ...profileData,
          hobbies: profileData.hobbies.filter((hobby) => hobby !== hobbyToRemove),
        })
      }
    } catch (error) {
      console.error("Error removing hobby:", error)
      toast.error("Failed to remove hobby")

      // Still update local state even if API call fails
      setProfileData({
        ...profileData,
        hobbies: profileData.hobbies.filter((hobby) => hobby !== hobbyToRemove),
      })
    }
  }

  // Filter skills based on search
  const filteredSkills = availableSkills.filter((skill) => skill.toLowerCase().includes(searchSkill.toLowerCase()))

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  const goToResume = () => {
    navigate("/template1"); // Change route if needed
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <Toaster position="top-right" />
      <div className="w-full max-w-[90%] xl:max-w-[1400px]">
        <div className="p-6 bg-white rounded-lg shadow-lg border border-blue-100">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div className="flex items-start gap-6">
              <div
                className={`relative w-32 h-32 rounded-full overflow-hidden border-2 ${isDragging ? "border-blue-500 bg-blue-50" : "border-blue-300"
                  } transition-all duration-200 hover:shadow-md`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <img
                  src={profileData.imageSrc || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
                <label
                  htmlFor="profile-image"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                >
                  {/* Upload icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex-grow">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      value={profileData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="font-bold text-xl border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                      placeholder="Name"
                    />
                    <input
                      value={profileData.designation}
                      onChange={(e) => handleInputChange("designation", e.target.value)}
                      className="font-bold text-xl border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                      placeholder="Designation"
                    />
                    <input
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="text-sm border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                      type="email"
                      placeholder="Email"
                    />
                    <input
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="text-sm border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                      placeholder="Phone"
                    />
                    <input
                      value={profileData.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      className="text-sm border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                      placeholder="LinkedIn URL"
                    />
                    <input
                      value={profileData.github}
                      onChange={(e) => handleInputChange("github", e.target.value)}
                      className="text-sm border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                      placeholder="GitHub URL"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="font-bold text-xl text-blue-800">{profileData.name}</h2>
                    <p className="text-sm text-blue-600">{profileData.designation}</p>
                    <p className="text-sm">{profileData.email}</p>
                    <p className="text-sm">{profileData.phone}</p>
                    <p className="text-sm text-blue-600">
                      <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">
                        {profileData.linkedin}
                      </a>
                    </p>
                    <p className="text-sm text-blue-600">
                      <a href={profileData.github} target="_blank" rel="noopener noreferrer">
                        {profileData.github}
                      </a>
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={goToResume}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
              >
                Resume
              </button>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* User Description Section */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-blue-800">About Me</h3>
                </div>

                {isEditing ? (
                  <div>
                    <textarea
                      value={profileData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none min-h-[100px]"
                      placeholder="Write a short description about yourself..."
                      maxLength={220}
                    ></textarea>
                    <div className={`text-sm mt-1 ${profileData.description.length < 180 || profileData.description.length > 220 ? 'text-red-500' : 'text-green-600'}`}>
                      {profileData.description.length} / 220 characters
                      {profileData.description.length < 180 && <span> (Minimum 180 characters required)</span>}
                      {profileData.description.length > 220 && <span> (Maximum limit exceeded!)</span>}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-3 rounded-md border border-blue-200 shadow-sm">
                    {profileData.description ? (
                      <p className="text-gray-700">{profileData.description}</p>
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        No description added yet. Click Edit to add a description.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Experience Section */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-blue-800">Work Experience</h3>
                  <button
                    onClick={handleAddExperience}
                    className="text-blue-600 hover:text-blue-800 bg-white rounded-full p-1 shadow-sm hover:shadow transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isAddingExperience && (
                  <div className="bg-white p-4 rounded-md mb-4 border border-blue-200 shadow-sm">
                    <h4 className="font-medium mb-2 text-blue-800">
                      {editingExperienceId ? "Edit Experience" : "Add Experience"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative">
                        <label className="block text-sm mb-1 text-gray-700">Job Title</label>
                        <div className="relative">
                          <input
                            value={searchJobTitle}
                            onChange={(e) => setSearchJobTitle(e.target.value)}
                            onFocus={() => setShowJobTitleDropdown(true)}
                            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                            placeholder="e.g., Software Engineer"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        {showJobTitleDropdown && filteredJobTitles.length > 0 && (
                          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {filteredJobTitles.map((title, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                                onClick={() => handleSelectJobTitle(title)}
                              >
                                {title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-gray-700">Company</label>
                        <input
                          value={newExperience.company}
                          onChange={(e) => handleExperienceInputChange("company", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                          placeholder="Company name"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm mb-1 text-gray-700">From Year</label>
                        <div className="relative">
                          <input
                            value={newExperience.fromYear}
                            onChange={(e) => handleExperienceInputChange("fromYear", e.target.value)}
                            onFocus={() => setShowExpFromYearDropdown(true)}
                            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                            placeholder="e.g., 2020"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        {showExpFromYearDropdown && (
                          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {availableYears.map((year, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                                onClick={() => handleSelectExpFromYear(year)}
                              >
                                {year}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <label className="block text-sm mb-1 text-gray-700">To Year</label>
                        <div className="relative">
                          <input
                            value={newExperience.toYear}
                            onChange={(e) => handleExperienceInputChange("toYear", e.target.value)}
                            onFocus={() => setShowExpToYearDropdown(true)}
                            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                            placeholder="e.g., 2023 or Present"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        {showExpToYearDropdown && (
                          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {availableExpToYears.map((year, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                                onClick={() => handleSelectExpToYear(year)}
                              >
                                {year}
                              </div>
                            ))}
                            <div
                              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                              onClick={() => handleSelectExpToYear("Present")}
                            >
                              Present
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-700">Experience Description</label>
                        <textarea
                          value={newExperience.description}
                          maxLength={300}
                          onChange={(e) => handleExperienceInputChange("description", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none min-h-[100px]"
                          placeholder="Describe your responsibilities and achievements..."
                        ></textarea>
                        <div className={`text-sm mt-1 ${newExperience.description.length < 250 || newExperience.description.length > 300 ? 'text-red-500' : 'text-green-600'}`}>
                          {newExperience.description.length} / 300 characters
                          {newExperience.description.length < 250 && <span> (Minimum 250 characters required)</span>}
                          {newExperience.description.length > 300 && <span> (Maximum limit exceeded!)</span>}
                        </div>

                      </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => {
                          setIsAddingExperience(false)
                          setEditingExperienceId(null)
                        }}
                        className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md mr-2 hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleExperienceSubmit}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                        disabled={!newExperience.title || !newExperience.company || !newExperience.fromYear}
                      >
                        {editingExperienceId ? "Update Experience" : "Add Experience"}
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  {profileData.experience &&
                    profileData.experience.map((exp, index) => (
                      <div
                        key={exp._id || index}
                        className="bg-white p-4 rounded-md border border-blue-200 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                          <div>
                            <h4 className="font-medium text-blue-800">{exp.title}</h4>
                            <p className="text-gray-700">
                              {exp.company} {exp.companyType ? `(${exp.companyType})` : ""}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {exp.fromYear} - {exp.toYear || "Present"}
                            </p>
                          </div>
                          <div className="flex space-x-2 self-start">
                            <button
                              onClick={() => handleEditExperience(exp)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleRemoveExperience(exp._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {exp.description && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <p className="text-gray-700 text-sm">{exp.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {(!profileData.experience || profileData.experience.length === 0) && !isAddingExperience && (
                  <p className="text-gray-500 text-sm">
                    No work experience added yet. Click the + icon to add experience.
                  </p>
                )}
              </div>

              {/* Projects Section */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-blue-800">Projects</h3>
                  <button
                    onClick={handleAddProject}
                    className="text-blue-600 hover:text-blue-800 bg-white rounded-full p-1 shadow-sm hover:shadow transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isAddingProject && (
                  <div className="bg-white p-4 rounded-md mb-4 border border-blue-200 shadow-sm">
                    <h4 className="font-medium mb-2 text-blue-800">
                      {editingProjectId ? "Edit Project" : "Add Project"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-700">Project Name</label>
                        <input
                          value={newProject.name}
                          onChange={(e) => handleProjectInputChange("name", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                          placeholder="Project name"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-700">Company Name</label>
                        <input
                          value={newProject.companyName}
                          onChange={(e) => handleProjectInputChange("companyName", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                          placeholder="Company name (if applicable)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-gray-700">Start Date</label>
                        <input
                          value={newProject.startDate}
                          onChange={(e) => handleProjectInputChange("startDate", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                          placeholder="e.g., Jan 2022"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-gray-700">End Date</label>
                        <input
                          value={newProject.endDate}
                          onChange={(e) => handleProjectInputChange("endDate", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                          placeholder="e.g., Mar 2022 or Present"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-700">Description</label>
                        <textarea
                          value={newProject.description}
                          onChange={(e) => handleProjectInputChange("description", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none min-h-[100px]"
                          placeholder="Project description"
                          maxLength={300}
                        ></textarea>
                        <div className={`text-sm mt-1 ${newProject.description.length < 250 || newProject.description.length > 300 ? 'text-red-500' : 'text-green-600'}`}>
                          {newProject.description.length} / 300 characters
                          {newProject.description.length < 250 && <span> (Minimum 250 characters required)</span>}
                          {newProject.description.length > 300 && <span> (Maximum limit exceeded!)</span>}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => {
                          setIsAddingProject(false)
                          setEditingProjectId(null)
                        }}
                        className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md mr-2 hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleProjectSubmit}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                      >
                        {editingProjectId ? "Update Project" : "Add Project"}
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {profileData.projects &&
                    profileData.projects.map((project, index) => (
                      <div
                        key={project._id || index}
                        className="bg-white p-4 rounded-md border border-blue-200 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-blue-800">{project.name}</h4>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleRemoveProject(project._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {project.companyName && <p className="text-gray-700">Company: {project.companyName}</p>}
                        {(project.startDate || project.endDate) && (
                          <p className="text-gray-600 text-sm">
                            {project.startDate} - {project.endDate || "Present"}
                          </p>
                        )}
                        {project.description && <p className="text-gray-600 text-sm mt-2">{project.description}</p>}
                      </div>
                    ))}
                </div>

                {(!profileData.projects || profileData.projects.length === 0) && !isAddingProject && (
                  <p className="text-gray-500 text-sm">No projects added yet. Click the + icon to add projects.</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Skills Section */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-blue-800">Key Skills</h3>
                  <button
                    onClick={handleAddSkill}
                    className="text-blue-600 hover:text-blue-800 bg-white rounded-full p-1 shadow-sm hover:shadow transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isAddingSkill && (
                  <div className="mb-4 relative">
                    <div className="flex">
                      <input
                        value={searchSkill}
                        onChange={handleSkillInputChange}
                        onFocus={() => setShowSkillDropdown(true)}
                        className="flex-grow border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                        placeholder="Search for a skill"
                      />
                      <button
                        onClick={() => setIsAddingSkill(false)}
                        className="ml-2 bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>

                    {showSkillDropdown && filteredSkills.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredSkills.map((skill, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleSelectSkill(skill)}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {profileData.skills &&
                    profileData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-4 py-1 bg-white border border-blue-200 rounded-full text-sm flex items-center group hover:shadow-sm transition-all"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  {(!profileData.skills || profileData.skills.length === 0) && !isAddingSkill && (
                    <p className="text-gray-500 text-sm">No skills added yet. Click the + icon to add skills.</p>
                  )}
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-blue-800">Educational Qualification:</h3>
                  <button
                    onClick={handleAddEducation}
                    className="text-blue-600 hover:text-blue-800 bg-white rounded-full p-1 shadow-sm hover:shadow transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isAddingEducation && (
                  <div className="bg-white p-4 rounded-md mb-4 border border-blue-200 shadow-sm">
                    <h4 className="font-medium mb-2 text-blue-800">
                      {editingEducationId ? "Edit Education" : "Add Education"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative">
                        <label className="block text-sm mb-1 text-gray-700">Course/Degree</label>
                        <div className="relative">
                          <input
                            value={newEducation.degree}
                            onChange={(e) => handleEducationInputChange("degree", e.target.value)}
                            onFocus={() => setShowDegreeDropdown(true)}
                            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                            placeholder="e.g., MCA, BSC-IT"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        {showDegreeDropdown && (
                          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {DEGREE_TYPES.map((degree, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                                onClick={() => handleSelectDegree(degree)}
                              >
                                {degree}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <label className="block text-sm mb-1 text-gray-700">Institution</label>
                        <div className="relative">
                          <input
                            value={searchUniversity}
                            onChange={(e) => setSearchUniversity(e.target.value)}
                            onFocus={() => setShowUniversityDropdown(true)}
                            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                            placeholder="University/College name"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        {showUniversityDropdown && filteredUniversities.length > 0 && (
                          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {filteredUniversities.map((university, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                                onClick={() => handleSelectUniversity(university)}
                              >
                                {university}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <label className="block text-sm mb-1 text-gray-700">From Year</label>
                        <div className="relative">
                          <input
                            value={newEducation.fromYear}
                            onChange={(e) => handleEducationInputChange("fromYear", e.target.value)}
                            onFocus={() => setShowFromYearDropdown(true)}
                            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                            placeholder="e.g., 2020"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        {showFromYearDropdown && (
                          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {availableYears.map((year, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                                onClick={() => handleSelectFromYear(year)}
                              >
                                {year}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <label className="block text-sm mb-1 text-gray-700">To Year</label>
                        <div className="relative">
                          <input
                            value={newEducation.toYear}
                            onChange={(e) => handleEducationInputChange("toYear", e.target.value)}
                            onFocus={() => setShowToYearDropdown(true)}
                            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                            placeholder="e.g., 2023 or Present"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        {showToYearDropdown && (
                          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {availableToYears.map((year, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                                onClick={() => handleSelectToYear(year)}
                              >
                                {year}
                              </div>
                            ))}
                            <div
                              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                              onClick={() => handleSelectToYear("Present")}
                            >
                              Present
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center mb-2">
                          <label className="block text-sm text-gray-700 mr-4">CGPA/Percentage</label>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={newEducation.isPercentage}
                              onChange={handleTogglePercentage}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {newEducation.isPercentage ? "Percentage" : "CGPA"}
                            </span>
                          </div>
                        </div>
                        <input
                          value={newEducation.cgpa}
                          onChange={(e) => handleEducationInputChange("cgpa", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                          placeholder={newEducation.isPercentage ? "e.g., 85%" : "e.g., 3.8/4.0"}
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => {
                          setIsAddingEducation(false)
                          setEditingEducationId(null)
                        }}
                        className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md mr-2 hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleEducationSubmit}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                        disabled={!newEducation.degree || !newEducation.institution || !newEducation.fromYear}
                      >
                        {editingEducationId ? "Update Education" : "Add Education"}
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {profileData.education &&
                    profileData.education.map((edu, index) => (
                      <div
                        key={edu._id || index}
                        className="bg-white p-3 rounded-md border border-blue-200 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between">
                          <p className="font-medium text-blue-800">{edu.degree}</p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditEducation(edu)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleRemoveEducation(edu._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700">{edu.institution}</p>
                        <p className="text-gray-600 text-sm">
                          {edu.fromYear} - {edu.toYear || "Present"}
                        </p>
                        {edu.cgpa && (
                          <p className="text-gray-600 text-sm">
                            {edu.isPercentage ? "Percentage: " : "CGPA: "} {edu.cgpa}
                          </p>
                        )}
                      </div>
                    ))}
                </div>

                {(!profileData.education || profileData.education.length === 0) && !isAddingEducation && (
                  <p className="text-gray-500 text-sm">
                    No education details added yet. Click the + icon to add education.
                  </p>
                )}
              </div>

              {/* Certifications Section */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-blue-800">Certifications</h3>
                  <button
                    onClick={handleAddCertification}
                    className="text-blue-600 hover:text-blue-800 bg-white rounded-full p-1 shadow-sm hover:shadow transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isAddingCertification && (
                  <div className="bg-white p-4 rounded-md mb-4 border border-blue-200 shadow-sm">
                    <h4 className="font-medium mb-2 text-blue-800">
                      {editingCertificationId ? "Edit Certification" : "Add Certification"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-700">Certification Name</label>
                        <input
                          value={newCertification.name}
                          onChange={(e) => handleCertificationInputChange("name", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                          placeholder="e.g., AWS Certified Solutions Architect"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-gray-700">Issuing Organization</label>
                        <input
                          value={newCertification.issuer}
                          onChange={(e) => handleCertificationInputChange("issuer", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                          placeholder="e.g., Amazon Web Services"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-gray-700">Credential ID</label>
                        <input
                          value={newCertification.credentialId}
                          onChange={(e) => handleCertificationInputChange("credentialId", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                          placeholder="e.g., ABC123456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-gray-700">Issue Date</label>
                        <input
                          value={newCertification.date}
                          onChange={(e) => handleCertificationInputChange("date", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                          placeholder="e.g., Jan 2022"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-gray-700">Expiry Date (if applicable)</label>
                        <input
                          value={newCertification.expiryDate}
                          onChange={(e) => handleCertificationInputChange("expiryDate", e.target.value)}
                          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                          placeholder="e.g., Jan 2025 or No Expiry"
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => {
                          setIsAddingCertification(false)
                          setEditingCertificationId(null)
                        }}
                        className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md mr-2 hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCertificationSubmit}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                        disabled={!newCertification.name || !newCertification.issuer}
                      >
                        {editingCertificationId ? "Update Certification" : "Add Certification"}
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {profileData.certifications &&
                    profileData.certifications.map((cert, index) => (
                      <div
                        key={cert._id || index}
                        className="bg-white p-4 rounded-md border border-blue-200 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-blue-800">{cert.name}</h4>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditCertification(cert)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleRemoveCertification(cert._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700">Issuer: {cert.issuer}</p>
                        {cert.credentialId && <p className="text-gray-600 text-sm">ID: {cert.credentialId}</p>}
                        {cert.date && <p className="text-gray-600 text-sm">Issued: {cert.date}</p>}
                        {cert.expiryDate && <p className="text-gray-600 text-sm">Expires: {cert.expiryDate}</p>}
                      </div>
                    ))}
                </div>

                {(!profileData.certifications || profileData.certifications.length === 0) && !isAddingCertification && (
                  <p className="text-gray-500 text-sm">
                    No certifications added yet. Click the + icon to add certifications.
                  </p>
                )}
              </div>

              {/* Hobbies Section */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-blue-800">Hobbies & Interests</h3>
                  <button
                    onClick={handleAddHobby}
                    className="text-blue-600 hover:text-blue-800 bg-white rounded-full p-1 shadow-sm hover:shadow transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isAddingHobby && (
                  <div className="mb-4 relative">
                    <div className="flex">
                      <input
                        value={newHobby}
                        onChange={handleHobbyInputChange}
                        className="flex-grow border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                        placeholder={editingHobby ? "Edit hobby" : "Add a hobby or interest"}
                      />
                      <button
                        onClick={handleHobbySubmit}
                        className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                        disabled={!newHobby.trim()}
                      >
                        {editingHobby ? "Update" : "Add"}
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingHobby(false)
                          setEditingHobby(null)
                        }}
                        className="ml-2 bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {profileData.hobbies &&
                    profileData.hobbies.map((hobby, index) => (
                      <div
                        key={index}
                        className="px-4 py-1 bg-white border border-blue-200 rounded-full text-sm flex items-center group hover:shadow-sm transition-all"
                      >
                        {hobby}
                        <div className="ml-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEditHobby(hobby)} className="text-blue-500 hover:text-blue-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button onClick={() => handleRemoveHobby(hobby)} className="text-red-500 hover:text-red-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  {(!profileData.hobbies || profileData.hobbies.length === 0) && !isAddingHobby && (
                    <p className="text-gray-500 text-sm">No hobbies added yet. Click the + icon to add hobbies.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
