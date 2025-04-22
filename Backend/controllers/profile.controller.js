import { Profile } from "../models/Profile.js"

// Create a new profile
export const createProfile = async (req, res) => {
  try {
    const {
      userId,
      name,
      designation,
      email,
      phone,
      linkedin,
      github,
      description,
      skills,
      education,
      projects,
      experience,
      certifications,
      hobbies,
      imageSrc,
      resume,
    } = req.body

    // Check if profile already exists for this user
    const existingProfile = await Profile.findOne({ userId })
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this user",
      })
    }

    const newProfile = new Profile({
      userId,
      name,
      designation,
      email,
      phone,
      linkedin,
      github,
      description,
      skills: skills || [],
      education: education || [],
      projects: projects || [],
      experience: experience || [],
      certifications: certifications || [],
      hobbies: hobbies || [],
      imageSrc: imageSrc || "https://via.placeholder.com/100",
      resume,
    })

    await newProfile.save()

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile: newProfile,
    })
  } catch (error) {
    console.error("Error creating profile:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Get profile by user ID
export const getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    res.status(200).json({
      success: true,
      profile,
    })
  } catch (error) {
    console.error("Error fetching profile:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Get all profiles
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find()
    res.status(200).json({
      success: true,
      profiles,
    })
  } catch (error) {
    console.error("Error fetching profiles:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      name,
      designation,
      email,
      phone,
      linkedin,
      github,
      description,
      resume, // ✅ include resume
    } = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      {
        name,
        designation,
        email,
        phone,
        linkedin,
        github,
        description,
        resume, // ✅ include resume
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete profile
export const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params

    const deletedProfile = await Profile.findOneAndDelete({ userId })
    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting profile:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Add education
export const addEducation = async (req, res) => {
  try {
    const { userId } = req.params
    const { degree, institution, fromYear, toYear, cgpa, isPercentage } = req.body

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    profile.education.push({
      degree,
      institution,
      fromYear,
      toYear,
      cgpa,
      isPercentage,
    })

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Education added successfully",
      profile,
    })
  } catch (error) {
    console.error("Error adding education:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Update education
export const updateEducation = async (req, res) => {
  try {
    const { userId, eduId } = req.params
    const { degree, institution, fromYear, toYear, cgpa, isPercentage } = req.body

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    const educationIndex = profile.education.findIndex((edu) => edu._id.toString() === eduId)

    if (educationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Education entry not found",
      })
    }

    profile.education[educationIndex] = {
      ...profile.education[educationIndex].toObject(),
      degree,
      institution,
      fromYear,
      toYear,
      cgpa,
      isPercentage,
    }

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      profile,
    })
  } catch (error) {
    console.error("Error updating education:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Delete education
export const deleteEducation = async (req, res) => {
  try {
    const { userId, eduId } = req.params

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    profile.education = profile.education.filter((edu) => edu._id.toString() !== eduId)

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
      profile,
    })
  } catch (error) {
    console.error("Error deleting education:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Add project
export const addProject = async (req, res) => {
  try {
    const { userId } = req.params
    const { name, companyName, startDate, endDate, description } = req.body

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    profile.projects.push({
      name,
      companyName,
      startDate,
      endDate,
      description,
    })

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Project added successfully",
      profile,
    })
  } catch (error) {
    console.error("Error adding project:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Update project
export const updateProject = async (req, res) => {
  try {
    const { userId, projectId } = req.params
    const { name, companyName, startDate, endDate, description } = req.body

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    const projectIndex = profile.projects.findIndex((proj) => proj._id.toString() === projectId)

    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    profile.projects[projectIndex] = {
      ...profile.projects[projectIndex].toObject(),
      name,
      companyName,
      startDate,
      endDate,
      description,
    }

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      profile,
    })
  } catch (error) {
    console.error("Error updating project:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { userId, projectId } = req.params

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    profile.projects = profile.projects.filter((proj) => proj._id.toString() !== projectId)

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      profile,
    })
  } catch (error) {
    console.error("Error deleting project:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Add experience
export const addExperience = async (req, res) => {
  try {
    const { userId } = req.params
    const { title, company, fromYear, toYear, description } = req.body

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    profile.experience.push({
      title,
      company,
      fromYear,
      toYear,
      description,
    })

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Experience added successfully",
      profile,
    })
  } catch (error) {
    console.error("Error adding experience:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Update experience
export const updateExperience = async (req, res) => {
  try {
    const { userId, expId } = req.params
    const { title, company, fromYear, toYear, description } = req.body

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    const expIndex = profile.experience.findIndex((exp) => exp._id.toString() === expId)

    if (expIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      })
    }

    profile.experience[expIndex] = {
      ...profile.experience[expIndex].toObject(),
      title,
      company,
      fromYear,
      toYear,
      description,
    }

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      profile,
    })
  } catch (error) {
    console.error("Error updating experience:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const { userId, expId } = req.params

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    profile.experience = profile.experience.filter((exp) => exp._id.toString() !== expId)

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
      profile,
    })
  } catch (error) {
    console.error("Error deleting experience:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Add certification
export const addCertification = async (req, res) => {
  try {
    const { userId } = req.params
    const { name, issuer, credentialId, date, expiryDate } = req.body

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    profile.certifications.push({
      name,
      issuer,
      credentialId,
      date,
      expiryDate,
    })

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Certification added successfully",
      profile,
    })
  } catch (error) {
    console.error("Error adding certification:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Update certification
export const updateCertification = async (req, res) => {
  try {
    const { userId, certId } = req.params
    const { name, issuer, credentialId, date, expiryDate } = req.body

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    const certIndex = profile.certifications.findIndex((cert) => cert._id.toString() === certId)

    if (certIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      })
    }

    profile.certifications[certIndex] = {
      ...profile.certifications[certIndex].toObject(),
      name,
      issuer,
      credentialId,
      date,
      expiryDate,
    }

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      profile,
    })
  } catch (error) {
    console.error("Error updating certification:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Delete certification
export const deleteCertification = async (req, res) => {
  try {
    const { userId, certId } = req.params

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    profile.certifications = profile.certifications.filter((cert) => cert._id.toString() !== certId)

    await profile.save()

    res.status(200).json({
      success: true,
      message: "Certification deleted successfully",
      profile,
    })
  } catch (error) {
    console.error("Error deleting certification:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Add skill
export const addSkill = async (req, res) => {
  try {
    const { userId } = req.params
    const { skill } = req.body

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    // Check if skill already exists
    if (profile.skills.includes(skill)) {
      return res.status(400).json({
        success: false,
        message: "Skill already exists",
      })
    }

    profile.skills.push(skill)
    await profile.save()

    res.status(200).json({
      success: true,
      message: "Skill added successfully",
      profile,
    })
  } catch (error) {
    console.error("Error adding skill:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Delete skill
export const deleteSkill = async (req, res) => {
  try {
    const { userId, skill } = req.params

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    profile.skills = profile.skills.filter((s) => s !== skill)
    await profile.save()

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
      profile,
    })
  } catch (error) {
    console.error("Error deleting skill:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Add hobby
export const addHobby = async (req, res) => {
  try {
    const { userId } = req.params
    const { hobby } = req.body

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    // Check if hobby already exists
    if (profile.hobbies.includes(hobby)) {
      return res.status(400).json({
        success: false,
        message: "Hobby already exists",
      })
    }

    profile.hobbies.push(hobby)
    await profile.save()

    res.status(200).json({
      success: true,
      message: "Hobby added successfully",
      profile,
    })
  } catch (error) {
    console.error("Error adding hobby:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Delete hobby
export const deleteHobby = async (req, res) => {
  try {
    const { userId, hobby } = req.params

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    profile.hobbies = profile.hobbies.filter((h) => h !== hobby)
    await profile.save()

    res.status(200).json({
      success: true,
      message: "Hobby deleted successfully",
      profile,
    })
  } catch (error) {
    console.error("Error deleting hobby:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

// Update profile image
export const updateProfileImage = async (req, res) => {
  try {
    const { userId } = req.params
    const { imageSrc } = req.body

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    profile.imageSrc = imageSrc
    await profile.save()

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      profile,
    })
  } catch (error) {
    console.error("Error updating profile image:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

export const getProfileByUserIds = async (req, res) => {
  try {
    const { id } = req.params; // <- this is important!

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Profile ID is required",
      });
    }

    const profile = await Profile.findOne({ _id: id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found for this ID",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error fetching profile by _id:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
