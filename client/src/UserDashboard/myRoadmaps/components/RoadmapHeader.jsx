import React from 'react'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const RoadmapHeader = ({totalCount}) => {

  return (
    <motion.div
     initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
        <div>
              <h2 className="text-2xl font-bold" style={{ color: '#F9FAFB' }}>My Learning Roadmaps</h2>
        <p className="text-sm mt-1" style={{ color: '#9CA3AF' }}>
          {totalCount} roadmap{totalCount !== 1 ? 's' : ''} in your orbit
        </p>
        </div>

          <Link href="/create-roadmap">
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
        >
          <Sparkles size={15} />
          Generate New Roadmap
        </motion.button>
      </Link>

    </motion.div>
  )
}

export default RoadmapHeader